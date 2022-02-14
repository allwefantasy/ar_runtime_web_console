package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx._
import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model.HomeConfig
import tech.mlsql.app_runtime.db.service.BasicDBService
import tech.mlsql.app_runtime.user.action.{ActionHelper, ActionRequireLogin, BaseAction, ListTeamForFormAction}
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.form.{Dynamic, FormParams, Input}
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

class GetPublicHomeConfigAction extends BaseAction  {
  override def _run(params: Map[String, String]): String = {
    val configs = ctx.run(ctx.query[HomeConfig].filter(_.teamId==lift(AddHomeConfigAction.PUBLIC_TEAM_ID)))
    val res = configs.map(item=> (item.k->item.v)).toMap
    JSONTool.toJsonStr(res)
  }

  override def _help(): String = {
    JSONTool.toJsonStr(FormParams.toForm(GetPublicHomeConfigAction.Params).toList.reverse)
  }
}

object GetPublicHomeConfigAction {
  object Params {

  }

  def action  = "/home/public/get"

  def plugin = PluginItem(GetPublicHomeConfigAction.action,classOf[GetPublicHomeConfigAction].getName,PluginType.action,None)
}


class AddHomeConfigAction extends ActionRequireLogin {
  override def _run(params: Map[String, String]): String = {

    val websiteName = params(AddHomeConfigAction.Params.WEBSITE_NAME.name)
    val searchTitle = params(AddHomeConfigAction.Params.SEARCH_TITLE.name)
    val skusUrl = params.getOrElse(AddHomeConfigAction.Params.SKU_URL.name,"/home/list")
    val mainAction = params.getOrElse(AddHomeConfigAction.Params.MAIN_ACTION.name,"")
    val mainName = params.getOrElse(AddHomeConfigAction.Params.MAIN_NAME.name,"")
    val icp = params.getOrElse(AddHomeConfigAction.Params.ICP.name,"")


    var teamId = AddHomeConfigAction.PUBLIC_TEAM_ID

    val token = params.getOrElse(ActionRequireLogin.Params.ADMIN_TOKEN.name, "")
    if (BasicDBService.adminToken != token) {
      teamId = params(AddHomeConfigAction.Params.TEAM_ID.name).toInt
      val teamIds = ActionHelper.getTeams(getUser(params).get.id)
      if (teamIds.contains(teamId)) {
        render(400, ActionHelper.msg("The target team is not belongs to you."))
      }
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

    upsert(AddHomeConfigAction.Params.WEBSITE_NAME.name, websiteName)
    upsert(AddHomeConfigAction.Params.SEARCH_TITLE.name, searchTitle)
    upsert(AddHomeConfigAction.Params.SKU_URL.name, skusUrl)
    upsert(AddHomeConfigAction.Params.MAIN_ACTION.name, mainAction)
    upsert(AddHomeConfigAction.Params.MAIN_NAME.name, mainName)
    upsert(AddHomeConfigAction.Params.ICP.name, icp)

    ActionHelper.msg("Success")
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
    val MAIN_NAME = Input("mainName", "")
    val MAIN_ACTION = Input("mainAction", "")
    val ICP = Input("icp", "")

  }

  val PUBLIC_TEAM_ID = -1

  def action = "/config/home"

  def plugin = PluginItem(AddHomeConfigAction.action, classOf[AddHomeConfigAction].getName, PluginType.action, None)
}

