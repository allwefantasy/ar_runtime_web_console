package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx._
import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model.{ScriptFile, ScriptUserRw}
import tech.mlsql.app_runtime.commons._
import tech.mlsql.app_runtime.plugin.user.action.{ActionRequireResourceAccess, UserService}
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.action.CustomAction
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}


/**
 * 15/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class CreateScriptFileAction extends ActionRequireResourceAccess {
  override def _run(params: Map[String, String]): String = {

    val userId = getUser(params).get.id
    
    val parentId = params.getOrElse(CreateScriptFileAction.Params.PARENT_ID.name, "-1").toInt
    val isDir = params(CreateScriptFileAction.Params.IS_DIR.name).toInt

    if (parentId != -1) {
      val parentIsDir = ctx.run(ctx.query[ScriptFile].filter(_.id == lift(parentId))).headOption match {
        case Some(item) => item.isDir == ScriptFile.DIR
        case None => true
      }
      if (!parentIsDir) {
        render(400, JSONTool.toJsonStr(List(Map("msg" -> "parentId should be directory"))))
      }
    }

    val icon = if (isDir == ScriptFile.DIR) "folder-close" else "document"

    val fileName = params(CreateScriptFileAction.Params.LABEL.name)
    ctx.transaction {
      val scriptFile = ctx.run(ctx.query[ScriptFile].insert(
        _.content -> lift(params.getOrElse(CreateScriptFileAction.Params.CONTENT.name, "")),
        _.hasCaret -> 0,
        _.isDir -> lift(isDir),
        _.isExpanded -> lift(ScriptFile.NO_Expanded),
        _.label -> lift(fileName),
        _.parentId -> lift(parentId),
        _.name -> lift(fileName),
        _.icon -> lift(icon)
      ).returningGenerated(s => s.id))

      ctx.run(ctx.query[ScriptUserRw].insert(
        _.scriptFileId -> lift(scriptFile),
        _.mlsqlUserId -> lift(userId),
        _.isDelete -> lift(ScriptUserRw.UnDelete),
        _.isOwner -> lift(ScriptUserRw.OWNER),
        _.readable -> lift(ScriptUserRw.READ),
        _.writable -> lift(ScriptUserRw.WRITE)
      ))
    }
    val scriptFiles = ctx.run(ctx.query[ScriptFile].filter(_.name == lift(fileName)))

    JSONTool.toJsonStr(scriptFiles)
  }

  override def _help(): String = JSONTool.toJsonStr(FormParams.toForm(CreateScriptFileAction.Params).toList.reverse)
}

object CreateScriptFileAction {

  object Params {
    val USER_ID = Input("userId", "")
    val LOGIN_TOKEN = Input(UserService.Config.LOGIN_TOKEN, "")

    val PARENT_ID = Dynamic(
      name = "parentId",
      subTpe = "TreeSelect",
      depends = List(Params.USER_ID.name),
      valueProviderName = CreateScriptFileAction_Params_PARENT_ID.action)

    val IS_DIR = Select("isDir", List(), valueProvider = Option(() => {
      List(
        KV(Option("Directory"), Option(ScriptFile.DIR.toString)),
        KV(Option("File"), Option(ScriptFile.FILE.toString))
      )
    }))

    val CONTENT = Editor("content", values = List(), valueProvider = Option(() => {
      List(
        KV(Option("text"), Option(""))
      )
    }))

    val LABEL = Input("label", "")


  }

  def action = "createScriptFile"

  def plugin = PluginItem(CreateScriptFileAction.action,
    classOf[CreateScriptFileAction].getName, PluginType.action, None)
}

/**
 * This action work for PARENT_ID
 */
class CreateScriptFileAction_Params_PARENT_ID extends CustomAction {
  override def run(params: Map[String, String]): String = {
    val action = new ListScriptFileAction()
    val resStr = action.run(params)
    JSONTool.toJsonStr(List(KV(None, Option(resStr))))
  }
}

object CreateScriptFileAction_Params_PARENT_ID {
  def action = "createScriptFile_params_parentId"

  def plugin = PluginItem(CreateScriptFileAction_Params_PARENT_ID.action,
    classOf[CreateScriptFileAction_Params_PARENT_ID].getName, PluginType.action, None)
}
