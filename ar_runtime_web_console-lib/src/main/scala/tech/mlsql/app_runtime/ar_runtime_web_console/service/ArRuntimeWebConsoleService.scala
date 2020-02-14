package tech.mlsql.app_runtime.ar_runtime_web_console.service

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx._
import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model
import tech.mlsql.app_runtime.plugin.user.action.{UserQuery, UserService, UserSystemActionProxy}
import tech.mlsql.common.utils.serder.json.JSONTool

import scala.collection.mutable.ArrayBuffer


object ArRuntimeWebConsoleService {

  def findScriptFile(scriptId: Int) = {
    ctx.run(query[quill_model.ScriptFile].filter(_.id == lift(scriptId))).head
  }

  def buildFullPath(scriptFile: quill_model.ScriptFile) = {
    val pathBuffer = ArrayBuffer[String]()
    var item = scriptFile
    pathBuffer += item.name
    while (item.parentId != 0 && item.parentId != null) {
      item = findScriptFile(item.parentId)
      pathBuffer += item.name
    }
    pathBuffer.reverse.mkString("/")
  }

  def findProjectFiles(owner: String, projectName: String) = {
    val userStr = UserSystemActionProxy.proxy.run(UserQuery.action, Map(UserService.Config.USER_NAME -> owner))
    val user = JSONTool.parseJson[UserRes](userStr)

    val scriptFiles = ctx.run(
      query[quill_model.ScriptUserRw].
        filter(_.mlsqlUserId == lift(user.id)).
        join(query[quill_model.ScriptFile]).on {
        case (surw, sf) => surw.scriptFileId == sf.id
      }.map {
        case (_, sf) =>
          sf
      }
    ).toList

    val idToScriptFile = scriptFiles.map(f => (f.id, f)).toMap

    val projects = buildTree(scriptFiles).head.children
    val targetProject = projects.filter(p => p.name == projectName).head

    val buffer = ArrayBuffer[FullPathAndScriptFile]()

    def getFullPath(id: Int) = {
      val pathBuffer = ArrayBuffer[String]()
      var item = idToScriptFile(id)
      pathBuffer += item.name
      while (item.parentId != 0 && item.parentId != null) {
        item = idToScriptFile(item.parentId)
        pathBuffer += item.name
      }
      pathBuffer.reverse.mkString("/")
    }

    def collectPaths(file: IDParentID): Unit = {
      if (file.children.size == 0) {
        buffer.append(FullPathAndScriptFile(getFullPath(file.id.toString.toInt), idToScriptFile(file.id.asInstanceOf[Int])))
      } else {
        file.children.foreach { item => collectPaths(item) }
      }
    }

    collectPaths(targetProject)
    buffer
  }

  def isInPackage(currentScriptFile: FullPathAndScriptFile, projectFiles: List[FullPathAndScriptFile]): Boolean = {
    projectFiles.map(sf => sf.path.split("/")).
      filter(sfArray => sfArray.last == "__init__.py").
      map(sfArray => sfArray.dropRight(1)).
      filter(f => f.mkString("/") == currentScriptFile.path.split("/").dropRight(1).mkString("/")).size > 0
  }

  def findProjectNameFileIn(id: Int) = {


    var item = findScriptFile(id)
    var projectName = ""
    while (item.parentId != 0 && item.parentId != null) {
      item = findScriptFile(item.parentId)
      if (item.parentId != 0 && item.parentId != null) {
        projectName = item.name
      }
    }
    projectName
  }

  private def buildTree(scriptFiles: List[quill_model.ScriptFile]) = {

    val items = scriptFiles.map(sf => IDParentID(sf.id, sf.parentId, sf.name, ArrayBuffer()))

    val ROOTS = ArrayBuffer[IDParentID]()
    val tempMap = scala.collection.mutable.HashMap[Any, Int]()
    val itemsWithIndex = items.zipWithIndex
    itemsWithIndex.foreach { case (item, index) =>
      tempMap(item.id) = index
    }
    itemsWithIndex.foreach { case (item, index) =>

      if (item.parentID != null && item.parentID != 0) {
        items(tempMap(item.parentID)).children += item
      } else {
        ROOTS += item
      }
    }
    ROOTS
  }
}

case class FullPathAndScriptFile(path: String, scriptFile: quill_model.ScriptFile)

case class IDParentID(id: Any,
                      parentID: Any,
                      name: String,
                      children: scala.collection.mutable.ArrayBuffer[IDParentID])

case class UserRes(id: Int, var name: String)
