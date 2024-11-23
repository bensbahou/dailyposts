import { Button } from "@/components/ui/button"
import cssText from "data-text:~style.css"
import type { PlasmoCSConfig } from "plasmo"

import "~style.css"

export const config: PlasmoCSConfig = {
  matches: ["https://www.plasmo.com/*"]
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

const PlasmoOverlay = () => {
  return <Button>ContentUI</Button>
}

export default PlasmoOverlay
