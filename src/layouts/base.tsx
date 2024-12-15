import { Html } from "@kitajs/html";

export function BaseLayout(props: {
  children: JSX.Element
}) {
  return (
    <html>
      <head>
        <script src="/static/htmx.min.js" />
      </head>
      <body hx-boost="true">
        {props.children}
      </body>
    </html>
  )
}
