package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx._
import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model.ApiNav
import tech.mlsql.app_runtime.commons.{Dynamic, FormParams, Input, KV}
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

/**
 * 19/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class ListAPINav extends ActionWithHelp {
  override def _run(params: Map[String, String]): String = {
    val userId = params(CreateAPINav.Params.USER_ID.name).toInt
    val navs = ctx.run(ctx.query[ApiNav].filter(_.userId == lift(userId)))
    JSONTool.toJsonStr(navs)
  }

  override def _help(): String = JSONTool.toJsonStr(
    FormParams.toForm(ListAPINav.Params).toList.reverse)
}

object ListAPINav {

  object Params {
    val USER_ID = Input("userId", "")
  }

  def action = "listAPINav"

  def plugin = PluginItem(ListAPINav.action,
    classOf[ListAPINav].getName, PluginType.action, None)
}

// this class is for form
class ChooseAPINav extends ActionWithHelp {
  override def _run(params: Map[String, String]): String = {
    val res = new ListAPINav().run(params)
    val items = JSONTool.parseJson[List[ApiNav]](res)
    JSONTool.toJsonStr(items.map { item =>
      KV(Option(item.title), Option(item.id.toString))
    })
  }

  override def _help(): String = JSONTool.toJsonStr(
    FormParams.toForm(ChooseAPINav.Params).toList.reverse)
}

object ChooseAPINav {

  object Params {
    val USER_ID = Input("userId", "")
    val NAV_API_ID = Dynamic(
      name = "apiNavId",
      subTpe = "Select",
      depends = List(Params.USER_ID.name),
      valueProviderName = ChooseAPINav.action)
  }

  def action = "chooseAPINav"

  def plugin = PluginItem(ChooseAPINav.action,
    classOf[ChooseAPINav].getName, PluginType.action, None)
}

