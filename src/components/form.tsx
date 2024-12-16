import { Html } from "@kitajs/html";

type TextInputProps = {
  name: string,
  label: string,
  type?: string,
}
export function TextInput(props: TextInputProps) {
  return (
    <input type={props.type ?? "text"} placeholder={props.label} name={props.name} class="input input-bordered w-full max-w-xs"/>
  )
}
