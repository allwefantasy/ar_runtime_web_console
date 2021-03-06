package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx._
import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model.ApiNavItem
import tech.mlsql.app_runtime.commons.{Dynamic, FormParams, Input}
import tech.mlsql.app_runtime.plugin.user.action.{ActionRequireLogin, ActionRequireResourceAccess, UserService}
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

/**
 * 19/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class ListAPINavItems extends ActionRequireLogin {
  override def _run(params: Map[String, String]): String = {
    val items = ctx.run(ctx.query[ApiNavItem].filter(_.apiNavId == lift(params(ListAPINavItems.Params.NAV_API_ID.name).toInt)))
    JSONTool.toJsonStr(items)
  }

  override def _help(): String = JSONTool.toJsonStr(
    FormParams.toForm(ListAPINavItems.Params).toList.reverse)
}

object ListAPINavItems {

  object Params {
    val USER_NAME = Input(UserService.Config.USER_NAME, "")
    val NAV_API_ID = Dynamic(
      name = "apiNavId",
      subTpe = "Select",
      depends = List(Params.USER_NAME.name),
      valueProviderName = ListAPINav.action)
  }

  def action = "listAPINavItems"

  def plugin = PluginItem(ListAPINavItems.action,
    classOf[ListAPINavItems].getName, PluginType.action, None)
}
