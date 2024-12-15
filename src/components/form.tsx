import { Html, type Children } from "@kitajs/html";


export function Form(children: Children) {
  return (
    <form>
      {children}
    </form>
  )

}
