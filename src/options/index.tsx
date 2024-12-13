import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

import { usePromptsStore } from "~stores/usePromptsStore"

import "~style.css"

function IndexPopup() {
  const { GET_HEADLINES_PROMPT, GENERATE_PROMPT, setPrompts, reset } =
    usePromptsStore()
  const [formData, setFormData] = useState({
    GET_HEADLINES_PROMPT: "",
    GENERATE_PROMPT: ""
  })

  useEffect(() => {
    setFormData({
      GET_HEADLINES_PROMPT,
      GENERATE_PROMPT
    })
  }, [GET_HEADLINES_PROMPT, GENERATE_PROMPT])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPrompts(formData)
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Prompt Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Headlines Prompt
          </label>
          <textarea
            className="w-full min-h-[150px] p-2 border rounded-md"
            value={formData.GET_HEADLINES_PROMPT}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                GET_HEADLINES_PROMPT: e.target.value
              }))
            }
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Generate Article Prompt
          </label>
          <textarea
            className="w-full min-h-[150px] p-2 border rounded-md"
            value={formData.GENERATE_PROMPT}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                GENERATE_PROMPT: e.target.value
              }))
            }
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit">Save Changes</Button>
          <Button type="button" variant="outline" onClick={handleReset}>
            Reset to Defaults
          </Button>
        </div>
      </form>
    </div>
  )
}

export default IndexPopup
