package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model.ScriptFile
import tech.mlsql.app_runtime.commons._
import tech.mlsql.app_runtime.plugin.user.action.UserService
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.action.CustomAction
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

/**
 * 15/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class CreateScriptFileAction extends ActionWithHelp {
  override def _run(params: Map[String, String]): String = {
    "{}"
  }

  override def _help(): String = JSONTool.toJsonStr(FormParams.toForm(CreateScriptFileAction.Params))
}

object CreateScriptFileAction {

  object Params {
    val USER_NAME = Input(UserService.Config.USER_NAME, "")

    val IS_DIR = Select("isDir", List(), valueProvider = Option(() => {
      List(
        KV(Option("Directory"), Option(ScriptFile.DIR.toString)),
        KV(Option("File"), Option(ScriptFile.FILE.toString))
      )
    }))

    val PARENT_ID = Dynamic(name = "parentId", subTpe = "TreeSelect", depends = List(UserService.Config.USER_NAME), valueProviderName = CreateScriptFileAction_Params_PARENT_ID.action)

    val EMPTY_TREE = TreeSelect("emptyTree", "", valueProvider = Option(() => {
      List(KV(None, Option("{}")))
    }))

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
