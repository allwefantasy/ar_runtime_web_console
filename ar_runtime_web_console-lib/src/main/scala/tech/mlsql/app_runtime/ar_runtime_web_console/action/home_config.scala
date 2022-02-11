package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx._
import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model.HomeConfig
import tech.mlsql.app_runtime.user.action.{ActionHelper, ActionRequireLogin, ListTeamForFormAction}
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}
import tech.mlsql.serviceframework.platform.form.{Dynamic, FormParams, Input}


class AddHomeConfigAction extends ActionRequireLogin {
  override def _run(params: Map[String, String]): String = {

    val websiteName = params(AddHomeConfigAction.Params.WEBSITE_NAME.name)
    val searchTitle = params(AddHomeConfigAction.Params.SEARCH_TITLE.name)
    val skusUrl = params(AddHomeConfigAction.Params.SKU_URL.name)
    val teamId = params(AddHomeConfigAction.Params.TEAM_ID.name).toInt
    val teamIds = ActionHelper.getTeams(getUser(params).get.id)

    if (teamIds.contains(teamId)) {
      render(400, ActionHelper.msg("The target team is not belongs to you."))
    }

    def upsert(key: String, value: String) = {
      val isSet = ctx.run(ctx.query[HomeConfig].filter(_.teamId == lift(teamId)).filter(_.k == lift(key)).size) > 0
      if (isSet) {
        ctx.run(ctx.query[HomeConfig].
          filter(item => item.teamId == lift(teamId)).
          filter(item => item.k == lift(key)).
          update(_.v -> lift(value)))
      } else {
        ctx.run(ctx.query[HomeConfig].insert(_.k -> lift(key), _.v -> lift(value), _.teamId -> lift(teamId)))
      }
    }
    
    upsert(AddHomeConfigAction.Params.WEBSITE_NAME.name,websiteName)
    upsert(AddHomeConfigAction.Params.SEARCH_TITLE.name,searchTitle)
    upsert(AddHomeConfigAction.Params.SKU_URL.name,skusUrl)
    
    JSONTool.toJsonStr(List[String]())
  }

  override def _help(): String = {
    JSONTool.toJsonStr(FormParams.toForm(AddHomeConfigAction.Params).toList.reverse)
  }
}

object AddHomeConfigAction {
  object Params {
    val ADMIN_TOKEN = Input("admin_token", "")

    val TEAM_ID = Dynamic(
      name = "teamId",
      subTpe = "Select",
      depends = List(),
      valueProviderName = ListTeamForFormAction.action)

    val WEBSITE_NAME = Input("websiteName", "")
    val SEARCH_TITLE = Input("searchTitle", "")
    val SKU_URL = Input("skusUrl", "")

  }

  def action = "/config/home"

  def plugin = PluginItem(AddHomeConfigAction.action, classOf[AddHomeConfigAction].getName, PluginType.action, None)
}

