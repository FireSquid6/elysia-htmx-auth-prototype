import { Html } from "@kitajs/html";
import type { Children } from ".";
import { Errors } from "@/components/errors";

export function BaseLayout(props: {
  children: Children
}) {
  return (
    <html>
      <head>
        <script defer src="/static/htmx.min.js" />
        <script defer src="/static/main.js" />
        <link rel="stylesheet" href="/static/generated.css" />
        <title>An example site</title>
      </head>
      <body hx-boost="true">
        {props.children}
        <Errors />
      </body>
    </html>
  )
}
