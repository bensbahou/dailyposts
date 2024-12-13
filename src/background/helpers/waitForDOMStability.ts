export const waitForDOMStability = (
  page: any,
  timeoutMs: number = 300000,
  stabilityMs: number = 5000
) => {
  return page.evaluate(
    ({ timeoutMs, stabilityMs }) => {
      return new Promise((resolve, reject) => {
        let lastMutationTime = Date.now()
        let timeoutId: NodeJS.Timeout

        const observer = new MutationObserver(() => {
          lastMutationTime = Date.now()
        })

        // Observe everything
        observer.observe(document.body, {
          childList: true,
          subtree: true,
          attributes: true,
          characterData: true
        })

        // Check if DOM has been stable
        const stabilityChecker = setInterval(() => {
          if (Date.now() - lastMutationTime >= stabilityMs) {
            clearInterval(stabilityChecker)
            clearTimeout(timeoutId)
            observer.disconnect()
            resolve(true)
          }
        }, 100)

        // Timeout handler
        timeoutId = setTimeout(() => {
          clearInterval(stabilityChecker)
          observer.disconnect()
          reject(new Error("DOM stability timeout"))
        }, timeoutMs)
      })
    },
    { timeoutMs, stabilityMs }
  )
}
