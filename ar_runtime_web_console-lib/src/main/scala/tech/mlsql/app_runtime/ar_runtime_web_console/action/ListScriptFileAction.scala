package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx
import tech.mlsql.app_runtime.ar_runtime_web_console.PluginDB.ctx._
import tech.mlsql.app_runtime.ar_runtime_web_console.quill_model.{ScriptFile, ScriptUserRw}
import tech.mlsql.app_runtime.commons.{FormParams, Input}
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.{PluginItem, PluginType}

/**
 * 13/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
class ListScriptFileAction extends ActionWithHelp {

  override def _run(params: Map[String, String]): String = {
    val userId = try {
      params(ListScriptFileAction.Params.USER_ID.name).toInt
    } catch {
      case e: Exception =>
        return JSONTool.toJsonStr(List())
    }

    val scripts = ctx.run(ctx.query[ScriptUserRw].filter { f =>
      f.mlsqlUserId == lift(userId) && f.isDelete == lift(ScriptUserRw.UnDelete)
    }.join(ctx.query[ScriptFile]).on((sw, sf) => sw.scriptFileId == sf.id).map(item => item._2))

    JSONTool.toJsonStr(scripts)
  }

  override def _help(): String = {
    val items = FormParams.toForm(ListScriptFileAction.Params)
    JSONTool.toJsonStr(items)
  }
}

object ListScriptFileAction {

  object Params {
    //    val USER_NAME = Input(UserService.Config.USER_NAME, "")
    val USER_ID = Input("userId", "")
  }

  def action = "listScriptFile"

  def plugin = PluginItem(ListScriptFileAction.action,
    classOf[ListScriptFileAction].getName, PluginType.action, None)
}
