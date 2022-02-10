package tech.mlsql.app_runtime.plugin

import tech.mlsql.app_runtime.ar_runtime_web_console.action._
import tech.mlsql.app_runtime.ar_runtime_web_console.app.ArRuntimeWebConsoleApp
import tech.mlsql.serviceframework.platform.{Plugin, PluginItem}

/**
 * 18/9/2021 WilliamZhu(allwefantasy@gmail.com)
 */
class ConsolePluginDesc extends Plugin {
  override def entries: List[PluginItem] = {
    List(
      ArRuntimeWebConsoleApp.plugin,
      ListScriptFileAction.plugin,
      CreateScriptFileAction.plugin,
      CreateScriptFileAction_Params_PARENT_ID.plugin,
      ListActions.plugin,
      CreateAPINav.plugin,
      CreateAPINavItem.plugin,
      ListAPINav.plugin,
      ListAPINavItems.plugin,
      ChooseAPINav.plugin,
      ListActionsForForm.plugin,
      ActionExits.plugin,
      PublicNav.plugin
      //      TestAction.plugin,
      //      TestUploadAction.plugin
    )
  }

}
