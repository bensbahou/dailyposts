import { Button } from "@/components/ui/button"
import { useEffect } from "react"

import { listenForStorageChanges } from "~lib/listenForStorageChanges"
import { useBearStore } from "~stores/useBearStore"

import "~style.css"

function IndexPopup() {
  useEffect(() => {
    listenForStorageChanges()
  }, [])
  const { bears, bigBears, reset, setBears } = useBearStore()
  return (
    <div className="plasmo-flex plasmo-items-center plasmo-justify-center plasmo-h-16 plasmo-w-40">
      <Button
        onClick={() =>
          setBears({
            bears: bears + 5
          })
        }>
        add 5 bears {bears} - {bigBears}
      </Button>
      <Button
        onClick={() =>
          setBears({
            bigBears: bigBears + 5
          })
        }>
        add 5 big bears {bears} - {bigBears}
      </Button>
      <Button onClick={() => reset()}>
        reset {bears} - {bigBears}
      </Button>
    </div>
  )
}

export default IndexPopup
