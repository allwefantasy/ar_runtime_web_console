package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.serviceframework.platform.action.attribute.{GroupAttribute, ModuleAttribute}

/**
 * 29/1/2022 WilliamZhu(allwefantasy@gmail.com)
 */
trait ActionInfo extends GroupAttribute with ModuleAttribute{
  override def groupName(): String = {
    "Navigator"
  }

  override def moduleName(): String = {
    "web"
  }
}
