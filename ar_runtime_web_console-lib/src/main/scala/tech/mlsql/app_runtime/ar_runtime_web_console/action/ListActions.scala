package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.action.attribute.{GroupAttribute, ModuleAttribute, OptionsAttribute}
import tech.mlsql.serviceframework.platform.form.{FormParams, KV}
import tech.mlsql.serviceframework.platform.{AppRuntimeStore, PluginItem, PluginType}

/**
 * 18/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class ListActions extends ActionWithHelp {
  override def _run(params: Map[String, String]): String = {
    val actions = AppRuntimeStore.store.getActions().map { action =>
      val instance = Class.forName(action.className).newInstance()
      var item = ActionItem(action.name, groupName = "", moduleName = "", options = Map())

      if (instance.isInstanceOf[GroupAttribute]) {
        item = item.copy(groupName = instance.asInstanceOf[GroupAttribute].groupName())
      }

      if (instance.isInstanceOf[ModuleAttribute]) {
        item = item.copy(moduleName = instance.asInstanceOf[ModuleAttribute].moduleName())
      }

      if (instance.isInstanceOf[OptionsAttribute]) {
        item = item.copy(options = instance.asInstanceOf[OptionsAttribute].options())
      }
      item

    }
    JSONTool.toJsonStr(actions)
  }

  override def _help(): String = {
    val items = FormParams.toForm(ListActions.Params)
    JSONTool.toJsonStr(items)
  }
}

case class ActionItem(name: String, groupName: String, moduleName: String, options: Map[String, String])

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




