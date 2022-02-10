package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx._
import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model.{ApiNav, ApiNavItem}
import tech.mlsql.app_runtime.db.service.BasicDBService
import tech.mlsql.app_runtime.user.action.{ActionRequireLogin, UserQuery, UserService}
import tech.mlsql.app_runtime.user.quill_model.User
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.form.{Dynamic, FormParams}
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

/**
 * 19/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class ListAPINavItems extends ActionWithHelp with ActionInfo {
  override def _run(params: Map[String, String]): String = {
    val navId = params(ListAPINavItems.Params.NAV_API_ID.name).toInt
    val nav = ctx.run(ctx.query[ApiNav].filter(_.id == lift(navId))).head
    val navOwner = ctx.run(ctx.query[User].filter(_.id == lift(nav.userId))).head
    if (navOwner.name == "__public__") {
      return JSONTool.toJsonStr(ctx.run(ctx.query[ApiNavItem].filter(_.apiNavId == lift(navId))))
    }

    if (!UserServiceHelper.isLogin(params)) {
      render(400, JSONTool.toJsonStr(List(Map("msg" -> "Login is required"))))
    }
    val userId = UserServiceHelper.getUser(params).get.id
    val items = ctx.run(ctx.query[ApiNavItem].filter(_.apiNavId == lift(userId)))
    JSONTool.toJsonStr(items)
  }

  override def _help(): String = JSONTool.toJsonStr(
    FormParams.toForm(ListAPINavItems.Params).toList.reverse)
}

object ListAPINavItems {

  object Params {
    val NAV_API_ID = Dynamic(
      name = "apiNavId",
      subTpe = "Select",
      depends = List(),
      valueProviderName = ListAPINav.action)
  }

  def action = "listAPINavItems"

  def plugin = PluginItem(ListAPINavItems.action,
    classOf[ListAPINavItems].getName, PluginType.action, None)
}

object UserServiceHelper {
  def getUser(params: Map[String, String]) = {
    val users = JSONTool.parseJson[List[User]](new UserQuery().run(params))
    users.headOption
  }

  def isLogin(params: Map[String, String]) = {
    val token = params.getOrElse(ActionRequireLogin.Params.ADMIN_TOKEN.name, "")

    val loginToken = params.getOrElse(UserService.Config.LOGIN_TOKEN, "")
    val userName = params.getOrElse(UserService.Config.USER_NAME, "")

    !(BasicDBService.adminToken != token && UserService.isLogin(userName, loginToken).size == 0)
  }
}
