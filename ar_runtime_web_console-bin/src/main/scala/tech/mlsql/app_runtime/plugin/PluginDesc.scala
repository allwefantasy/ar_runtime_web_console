package tech.mlsql.app_runtime.plugin

import tech.mlsql.app_runtime.ar_runtime_web_console.action.HelloWorldAction
import tech.mlsql.app_runtime.ar_runtime_web_console.app.ArRuntimeWebConsoleApp
import tech.mlsql.serviceframework.platform.{AppRuntimeStore, Plugin, PluginItem, PluginLoader}

class PluginDesc extends Plugin {
  override def entries: List[PluginItem] = {
    List(
      ArRuntimeWebConsoleApp.plugin,
      HelloWorldAction.plugin
    )
  }

  def registerForTest() = {
    val pluginLoader = PluginLoader(Thread.currentThread().getContextClassLoader, this)
    entries.foreach { item =>
      AppRuntimeStore.store.registerAction(item.name, item.clzzName, pluginLoader)
    }
  }
}
