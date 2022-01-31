package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx._
import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model.ApiNav
import tech.mlsql.app_runtime.user.action.{ActionRequireLogin, UserService}
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.form.{Dynamic, FormParams, Input, KV}
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

/**
 * 19/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
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

  def buildInAPINav = {
    Seq(
      ApiNav(-1, "登录/Login", -1),
      ApiNav(-2,"注册/Register",-1)
    )
  }


  object Params {
    val USER_NAME = Input(UserService.Config.USER_NAME, "")
  }

  def action = "listAPINav"

  def plugin = PluginItem(ListAPINav.action,
    classOf[ListAPINav].getName, PluginType.action, None)
}

// this class is for form
class ChooseAPINav extends ActionWithHelp with ActionInfo {
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
    val USER_NAME = Input(UserService.Config.USER_NAME, "")
    val NAV_API_ID = Dynamic(
      name = "apiNavId",
      subTpe = "Select",
      depends = List(Params.USER_NAME.name),
      valueProviderName = ChooseAPINav.action)
  }

  def action = "chooseAPINav"

  def plugin = PluginItem(ChooseAPINav.action,
    classOf[ChooseAPINav].getName, PluginType.action, None)
}

