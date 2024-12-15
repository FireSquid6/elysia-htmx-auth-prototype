import { Html, type Children } from "@kitajs/html";

export function BaseLayout(props: {
  children: Children
}) {
  return (
    <html>
      <head>
        <script src="/static/htmx.min.js" />
        <link rel="stylesheet" href="/static/generated.css" />
        <title>An example site</title>
      </head>
      <body hx-boost="true">
        {props.children}
      </body>
    </html>
  )
}
