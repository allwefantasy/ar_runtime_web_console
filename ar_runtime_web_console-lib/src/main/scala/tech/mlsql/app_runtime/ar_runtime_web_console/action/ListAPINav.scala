package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx._
import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model.APINav
import tech.mlsql.app_runtime.commons.{FormParams, Input}
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

/**
 * 19/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class ListAPINav extends ActionWithHelp {
  override def _run(params: Map[String, String]): String = {
    val userId = params(CreateAPINav.Params.USER_ID.name).toInt
    val navs = ctx.run(ctx.query[APINav].filter(_.userId == lift(userId)))
    JSONTool.toJsonStr(navs)
  }

  override def _help(): String = JSONTool.toJsonStr(
    FormParams.toForm(ListAPINav.Params).toList.reverse)
}

object ListAPINav {

  object Params {
    val USER_ID = Input("userId", "")
  }

  def action = "createAPINavItem"

  def plugin = PluginItem(ListAPINav.action,
    classOf[ListAPINav].getName, PluginType.action, None)
}
