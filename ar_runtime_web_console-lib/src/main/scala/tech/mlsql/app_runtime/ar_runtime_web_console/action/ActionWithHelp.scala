package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.serviceframework.platform.form.Input
import tech.mlsql.common.utils.serder.json.JSONTool
import tech.mlsql.serviceframework.platform.action.{ActionContext, CustomAction}


abstract class ActionWithHelp extends CustomAction {
  override def run(params: Map[String, String]): String = {
    if (params.contains(ActionWithHelp.Params.HELP.name)) {
      _help()
    }
    else {
      _run(params)
    }
  }

  def _run(params: Map[String, String]): String

  def _help(): String

  def render(status: Int, content: String): Unit = {
    val context = ActionContext.context()
    render(context.httpContext.response, status, content)
  }

  def renderEmpty(): String = {
    render(200, JSONTool.toJsonStr(List(Map())))
    ""
  }
}

object ActionWithHelp {

  object Params {
    val HELP = Input("__HELP__", "",options = Map())
  }

}
