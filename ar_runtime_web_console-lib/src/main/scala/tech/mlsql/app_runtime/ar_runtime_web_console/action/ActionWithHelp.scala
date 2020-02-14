package tech.mlsql.app_runtime.ar_runtime_web_console.action

import tech.mlsql.app_runtime.commons.Input
import tech.mlsql.serviceframework.platform.action.CustomAction

/**
 * 14/2/2020 WilliamZhu(allwefantasy@gmail.com)
 */
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
}

object ActionWithHelp {

  object Params {
    val HELP = Input("__HELP__", "")
  }

}
