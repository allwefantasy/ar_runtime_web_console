package tech.mlsql.app_runtime.ar_runtime_web_console.app

import net.csdn.ServiceFramwork
import net.csdn.common.reflect.ReflectHelper
import net.csdn.modules.http.HttpServer
import org.eclipse.jetty.server.Server
import org.eclipse.jetty.server.handler.{HandlerList, ResourceHandler}
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB
import tech.mlsql.serviceframework.platform.app.{AfterHTTPPhase, BeforeHTTPPhase, CustomApp, StartupPhase}
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

/**
 * 21/1/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class ArRuntimeWebConsoleApp extends CustomApp {
  override def run(params: Map[Any, Any]): Any = {
    if (ServiceFramwork.injector == null) return ""
    val httpServer = ServiceFramwork.injector.getInstance(classOf[HttpServer])
    val server = ReflectHelper.field(httpServer, "server").asInstanceOf[Server]
    val server_handler = server.getHandler.asInstanceOf[HandlerList]

    if (!ReflectHelper.field(server_handler, "_mutableWhenRunning").asInstanceOf[Boolean]) {
      ReflectHelper.field(server_handler, "_mutableWhenRunning", true)
    }
    val resource_handler = new ResourceHandler
    resource_handler.setDirectoriesListed(false)
    val webDir = this.getClass().getClassLoader().getResource(PluginDB.plugin_name).toExternalForm()
    resource_handler.setResourceBase(webDir);
    val origin = server_handler.getHandlers.filterNot { item =>
      item.isInstanceOf[ResourceHandler] && item.asInstanceOf[ResourceHandler].getBaseResource.getName.split("/").last == PluginDB.plugin_name
    }
    server_handler.setHandlers(Array(resource_handler) ++ origin);

  }

  override def phase: StartupPhase = BeforeHTTPPhase
}

object ArRuntimeWebConsoleApp {
  def action = PluginDB.plugin_name

  def plugin = PluginItem(ArRuntimeWebConsoleApp.action,
    classOf[ArRuntimeWebConsoleApp].getName, PluginType.app, Option(AfterHTTPPhase))
}
