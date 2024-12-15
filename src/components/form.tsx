import { Html, type Children } from "@kitajs/html";


export function Form(children: Children) {
  return (
    <form>
      {children}
    </form>
  )
}


type TextInputProps = {
  name: string,
  label: string,
}
export function TextInput(props: TextInputProps) {
  return (
    <input type="text" placeholder={props.label} name={props.name} class="input input-bordered w-full max-w-xs"/>
  )
}
