package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.commons.{FormParams, Input, KV, Select}
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

/**
 * 13/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class ScriptFileAction extends ActionWithHelp {


  override def _run(params: Map[String, String]): String = {
    JSONTool.toJsonStr(Map())
  }

  override def _help(): String = {
    val items = FormParams.toForm(ScriptFileAction.Params)
    JSONTool.toJsonStr(items)
  }
}

object ScriptFileAction {
  type ScriptFileActionParams = ScriptFileAction.Params.type

  object Params {
    val jack = Input("jack", "")
    val wow = Select("wow", List(), valueProvider = Option(() => {
      List(
        KV(Option("jack1"), Option("hahah")),
        KV(Option("jack2"), Option("hahah"))
      )
    }))
  }

  def action = "scriptFile"

  def plugin = PluginItem(ScriptFileAction.action,
    classOf[ScriptFileAction].getName, PluginType.action, None)
}
