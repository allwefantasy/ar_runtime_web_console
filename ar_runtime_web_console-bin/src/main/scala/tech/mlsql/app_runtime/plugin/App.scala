package tech.mlsql.app_runtime.plugin

import net.csdn.ServiceFramwork
import net.csdn.bootstrap.Application

object App {
  def main(args: Array[String]): Unit = {
    val applicationYamlName = "application.yml"
    ServiceFramwork.applicaionYamlName(applicationYamlName)
    ServiceFramwork.scanService.setLoader(classOf[App])
    ServiceFramwork.enableNoThreadJoin()

    val plugin = new PluginDesc
    plugin.registerForTest()

    Application.main(args)
    Thread.currentThread().join()

  }

}

class App {

}
