package tech.mlsql.app_runtime.ar_runtime_web_console.quill_model


case class ScriptFile(id: Int, name: String,
                      hasCaret: Int, icon: String, label: String,
                      parentId: Int, isDir: Int, content: String, isExpanded: Int)

case class ScriptUserRw(id: Int, scriptFileId: Int,
                        mlsqlUserId: Int,
                        isOwner: Int,
                        readable: Int,
                        writable: Int,
                        isDelete: Int) {

}

case class ApiNavItem(id: Int, title: String, action: String, apiNavId: Int, step: Int)

case class ApiNav(id: Int, title: String, userId: Int)

object ScriptFile {
  val DIR = 1
  val FILE = 2
  val Expanded = 1
  val NO_Expanded = 2
}

object ScriptUserRw {
  val Delete = 1
  val UnDelete = 2
  val READ = 1
  val UNREAD = 2

  val WRITE = 1
  val UNWRITE = 2

  val OWNER = 1
  val UNOWNER = 2
}