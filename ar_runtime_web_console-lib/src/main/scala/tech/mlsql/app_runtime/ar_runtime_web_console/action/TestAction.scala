package tech.mlsql.app_runtime.ar_runtime_web_console.action

import java.io.File

import org.apache.commons.fileupload.FileItem
import org.apache.commons.io.FileUtils
import tech.mlsql.app_runtime.user.action.UserService
import tech.mlsql.common.utils.path.PathFun
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.action.ActionContext
import tech.mlsql.serviceframework.platform.form.{FormParams, Input, Upload}
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

import scala.collection.JavaConverters._
import scala.collection.mutable.ArrayBuffer

/**
 * 1/2/2022 WilliamZhu(allwefantasy@gmail.com)
 */
class TestAction extends ActionWithHelp {
  override def _run(params: Map[String, String]): String = {
    println(params)
    JSONTool.toJsonStr(List(Map("msg" -> "Upload success")))
  }

  override def _help(): String = JSONTool.toJsonStr(
    FormParams.toForm(TestAction.Params).toList.reverse)
}

object TestAction {

  object Params {
    val USER_NAME = Input(UserService.Config.USER_NAME, "")
    val FILE = Upload("file", valueProviderName = TestUploadAction.action)
  }

  def action = "testAction"

  def plugin = PluginItem(TestAction.action,
    classOf[TestAction].getName, PluginType.action, None)

}


class TestUploadAction extends ActionWithHelp {
  override def _run(params: Map[String, String]): String = {
    val actionContext = ActionContext.context()
    val items = actionContext.others(ActionContext.Config.formItems).asInstanceOf[java.util.List[FileItem]]
    if (items.size() != 1) {
      render(400, JSONTool.toJsonStr(List(Map("msg" -> "Only support one file to upload"))))
    }
    val paths = ArrayBuffer[Map[String, String]]()
    try {
      val repoLocation = "."
      items.asScala.filterNot(f => f.isFormField).map {
        item =>
          val fileContent = item.getInputStream()
          val tempFilePath = PathFun(repoLocation).add("files").add(item.getFieldName).toPath
          val targetPath = new File(tempFilePath)
          FileUtils.copyInputStreamToFile(fileContent, targetPath)
          fileContent.close()
          paths += Map("path" -> tempFilePath)
      }
    } catch {
      case e: Exception =>
        throw e
    }
    JSONTool.toJsonStr(paths)
  }

  override def _help(): String = JSONTool.toJsonStr(
    FormParams.toForm(TestAction.Params).toList.reverse)
}

object TestUploadAction {

  def action = "testUploadAction"

  def plugin = PluginItem(TestUploadAction.action,
    classOf[TestUploadAction].getName, PluginType.action, None)

}
