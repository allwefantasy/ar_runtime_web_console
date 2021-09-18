package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB
import tech.mlsql.app_runtime.db.action.BasicActionProxy

/**
 * 15/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
object ArRuntimeWebConsoleActionProxy {
  lazy val proxy = new BasicActionProxy(PluginDB.plugin_name)

}
