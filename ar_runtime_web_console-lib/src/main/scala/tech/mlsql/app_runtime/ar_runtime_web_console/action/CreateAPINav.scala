package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx._
import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model.{ApiNav, ApiNavItem}
import tech.mlsql.app_runtime.user.action.{ActionRequireLogin, UserService}
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.form.{Dynamic, FormParams, Input}
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

/**
 * 19/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class CreateAPINav extends ActionRequireLogin {
  override def _run(params: Map[String, String]): String = {
    val title = params(CreateAPINav.Params.TITLE.name)
    val userId = getUser(params).get.id

    if (ctx.run(ctx.query[ApiNav].filter(_.title == lift(title)).size > 0)) {
      render(400, JSONTool.toJsonStr(List(Map("msg" -> s"${title} exits"))))
    }

    val navAPIId = ctx.run(ctx.query[ApiNav].insert(
      _.title -> lift(title),
      _.userId -> lift(userId)
    ).returningGenerated(s => s.id))

    val navAPIs = ctx.run(ctx.query[ApiNav].filter(_.id == lift(navAPIId)))
    JSONTool.toJsonStr(navAPIs)
  }

  override def _help(): String = JSONTool.toJsonStr(
    FormParams.toForm(CreateAPINav.Params).toList.reverse)
}

object CreateAPINav {

  object Params {
    val TITLE = Input("title", "")
  }

  def action = "createAPINav"

  def plugin = PluginItem(CreateAPINav.action,
    classOf[CreateAPINav].getName, PluginType.action, None)
}

class CreateAPINavItem extends ActionWithHelp {
  override def _run(params: Map[String, String]): String = {

    val apiNavItemId = ctx.run(ctx.query[ApiNavItem].insert(
      _.title -> lift(params(CreateAPINavItem.Params.TITLE.name)),
      _.action -> lift(params(CreateAPINavItem.Params.ACTION.name)),
      _.apiNavId -> lift(params(CreateAPINavItem.Params.NAV_API_ID.name).toInt),
      _.step -> lift(params(CreateAPINavItem.Params.STEP.name).toInt)
    ).returningGenerated(s => s.id))

    val navAPIItems = ctx.run(ctx.query[ApiNavItem].filter(_.id == lift(apiNavItemId)))
    JSONTool.toJsonStr(navAPIItems)
  }

  override def _help(): String = JSONTool.toJsonStr(
    FormParams.toForm(CreateAPINavItem.Params).toList.reverse)
}

object CreateAPINavItem {

  object Params {

    val USER_NAME = Input(UserService.Config.USER_NAME, "")

    val NAV_API_ID = Dynamic(
      name = "apiNavId",
      subTpe = "Select",
      depends = List(Params.USER_NAME.name),
      valueProviderName = ChooseAPINav.action)

    val ACTION = Dynamic(
      name = "_action",
      subTpe = "Select",
      depends = List(Params.USER_NAME.name),
      valueProviderName = ListActionsForForm.action)

    val TITLE = Input("title", "")
    val STEP = Input("step", "")


  }

  def action = "createAPINavItem"

  def plugin = PluginItem(CreateAPINavItem.action,
    classOf[CreateAPINavItem].getName, PluginType.action, None)
}
