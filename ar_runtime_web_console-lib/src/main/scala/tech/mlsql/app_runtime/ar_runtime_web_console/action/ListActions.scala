package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.commons.FormParams
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.{AppRuntimeStore, PluginItem, PluginType}

/**
 * 18/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class ListActions extends ActionWithHelp {
  override def _run(params: Map[String, String]): String = {
    JSONTool.toJsonStr(AppRuntimeStore.store.getActions().map(_.copy(loader = null)))
  }

  override def _help(): String = {
    val items = FormParams.toForm(ListActions.Params)
    JSONTool.toJsonStr(items)
  }
}

object ListActions {

  object Params {
  }

  def action = "listActions"

  def plugin = PluginItem(ListActions.action,
    classOf[ListActions].getName, PluginType.action, None)
}
