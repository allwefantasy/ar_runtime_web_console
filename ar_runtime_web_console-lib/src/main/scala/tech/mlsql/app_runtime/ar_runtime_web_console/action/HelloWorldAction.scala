package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB
import tech.mlsql.app_runtime.db.action.BasicActionProxy
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.action.CustomAction
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

/**
 * Action logical
 */
class HelloWorldAction extends CustomAction {
  override def run(params: Map[String, String]): String = {
    JSONTool.toJsonStr(Map("msg" -> "hello world"))
  }
}

/**
 * Action Info
 */
object HelloWorldAction {
  def action = "hello_world"

  def plugin = PluginItem(HelloWorldAction.action,
    classOf[HelloWorldAction].getName, PluginType.action, None)
}

/**
 * The other plugin can use ExampleActionProxy.proxy to call action based on
 * rest. For example:
 * val res = ExampleActionProxy.proxy.run(ExampleAction.action,Map())
 */
object ExampleActionProxy {
  lazy val proxy = new BasicActionProxy(PluginDB.plugin_name)
}

/**
 * The other plugin can use ExampleService to operate the db which
 * belongs to example plugin.
 */
object ExampleService {

  object Config {
    val EXAMPLE_KEY = s"${PluginDB.plugin_name}__config__example"
  }

}
