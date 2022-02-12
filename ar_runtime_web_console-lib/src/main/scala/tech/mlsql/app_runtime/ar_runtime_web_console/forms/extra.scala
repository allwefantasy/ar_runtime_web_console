package tech.mlsql.app_runtime.ar_runtime_web_console.forms

case class Title(name: String, value: String, tpe: String = "Title", @transient valueProvider: Option[() => String] = None, options: Map[String, String] = Map())
