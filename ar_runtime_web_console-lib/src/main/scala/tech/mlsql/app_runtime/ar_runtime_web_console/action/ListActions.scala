package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.commons.{FormParams, KV}
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.{ActionItem, AppRuntimeStore, PluginItem, PluginType}

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

class ListActionsForForm extends ActionWithHelp {
  override def _run(params: Map[String, String]): String = {
    val items = JSONTool.parseJson[List[ActionItem]](new ListActions().run(params))
    JSONTool.toJsonStr(items.map { item =>
      KV(Option(item.name), Option(item.name))
    })
  }

  override def _help(): String = {
    val items = FormParams.toForm(ListActions.Params)
    JSONTool.toJsonStr(items)
  }
}

object ListActionsForForm {

  def action = "listActionsForForm"

  def plugin = PluginItem(ListActionsForForm.action,
    classOf[ListActionsForForm].getName, PluginType.action, None)
}




