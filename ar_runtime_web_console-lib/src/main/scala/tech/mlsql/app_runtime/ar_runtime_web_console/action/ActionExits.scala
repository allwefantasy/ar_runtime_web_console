package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.form.{FormParams, Input}
import tech.mlsql.serviceframework.platform.{AppRuntimeStore, PluginItem, PluginType}

/**
 * 30/1/2022 WilliamZhu(allwefantasy@gmail.com)
 */
class ActionExits extends ActionWithHelp {
  override def _run(params: Map[String, String]): String = {
    val name = params(ActionExits.Params.ACTION_NAME.name)
    val actions = AppRuntimeStore.store.getActions().filter(_.name == name)
    if (actions.length > 0) {
      JSONTool.toJsonStr(Map("exists" -> true))
    } else JSONTool.toJsonStr(Map("exists" -> false))
  }

  override def _help(): String = JSONTool.toJsonStr(
    FormParams.toForm(ActionExits.Params).toList)

}

object ActionExits {

  object Params {
    val ACTION_NAME = Input("actionName", "")
  }

  def action = "existAction"

  def plugin = PluginItem(ActionExits.action,
    classOf[ActionExits].getName, PluginType.action, None)

}
