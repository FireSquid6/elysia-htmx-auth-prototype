import { Html } from "@kitajs/html";
import { BaseLayout } from "@/layouts/base";

export function HomePage() {
  return (
    <BaseLayout>
      <p>Hello, world!</p>
      <a>This is some stuff!</a>
    </BaseLayout>
  )
}
