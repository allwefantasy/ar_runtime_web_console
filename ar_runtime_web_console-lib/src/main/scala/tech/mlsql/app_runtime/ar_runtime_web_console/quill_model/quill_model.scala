package tech.mlsql.app_runtime.ar_runtime_web_console.quill_model


case class ScriptFile(id: Int, name: String,
                      hasCaret: Int, icon: String, label: String,
                      parentId: Int, idDir: String, content: String, isExpanded: Int)

case class ScriptUserRw(id: Int, scriptFileId: Int,
                        mlsqlUserId: Int,
                        isOwner: Int,
                        readable: Int,
                        writable: Int,
                        isDelete: Int)