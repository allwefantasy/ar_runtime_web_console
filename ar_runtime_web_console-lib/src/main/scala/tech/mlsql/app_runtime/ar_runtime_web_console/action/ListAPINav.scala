package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx._
import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model.ApiNav
import tech.mlsql.app_runtime.user.action.ActionRequireLogin
import tech.mlsql.app_runtime.user.quill_model.User
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.form.{Dynamic, FormParams, Input, KV}
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}


class ListAPINav extends ActionRequireLogin with ActionInfo {
  override def _run(params: Map[String, String]): String = {
    val userId = getUser(params).get.id
    val navs = ctx.run(ctx.query[ApiNav].filter(_.userId == lift(userId)))
    JSONTool.toJsonStr(navs)
  }

  override def _help(): String = JSONTool.toJsonStr(
    FormParams.toForm(ListAPINav.Params).toList.reverse)
}

object ListAPINav {

  object Params {
    val OPEN_TYPE = Input("openType", "")
  }

  def action = "listAPINav"

  def plugin = PluginItem(ListAPINav.action,
    classOf[ListAPINav].getName, PluginType.action, None)
}


class PublicNav extends ActionWithHelp with ActionInfo {
  override def _run(params: Map[String, String]): String = {
    val navs = ctx.run(ctx.query[User].filter(_.name == lift("__public__"))).headOption match {
      case Some(user) =>
        val navs = ctx.run(ctx.query[ApiNav].filter(_.userId == lift(user.id)))
        navs
      case None =>
        List[ApiNav]()
    }
    JSONTool.toJsonStr(navs.map { item =>
      KV(Option(item.title), Option(item.id.toString))
    })
  }

  override def _help(): String = {
    JSONTool.toJsonStr(FormParams.toForm(PublicNav.Params).toList.reverse)
  }
}

object PublicNav {
  object Params {
    val NAV_API_ID = Dynamic(
      name = "apiNavId",
      subTpe = "Select",
      depends = List(),
      valueProviderName = PublicNav.action)
  }

  def action = "/public/nav/list"

  def plugin = PluginItem(PublicNav.action, classOf[PublicNav].getName, PluginType.action, None)
}


// this class is for form
class ChooseAPINav extends ActionWithHelp with ActionInfo {
  override def _run(params: Map[String, String]): String = {
    val res = new ListAPINav()._run(params)
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
    val NAV_API_ID = Dynamic(
      name = "apiNavId",
      subTpe = "Select",
      depends = List(),
      valueProviderName = ChooseAPINav.action)
  }

  def action = "chooseAPINav"

  def plugin = PluginItem(ChooseAPINav.action,
    classOf[ChooseAPINav].getName, PluginType.action, None)
}

