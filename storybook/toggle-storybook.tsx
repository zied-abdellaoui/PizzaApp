import React, { useState, useEffect } from "react"
/**
 * Toggle Storybook mode, in __DEV__ mode only.
 *
 * In non-__DEV__ mode, or when Storybook isn't toggled on,
 * renders its children.
 *
 * The mode flag is persisted in async storage, which means it
 * persists across reloads/restarts - this is handy when developing
 * new components in Storybook.
 */
export function ToggleStorybook(props) {
  const [showStorybook, setShowStorybook] = useState(false)
  const [StorybookUIRoot, setStorybookUIRoot] = useState(null)

  useEffect(() => {
    if (__DEV__) {
      console.tron.debug("__DEV__ value:" + __DEV__, __DEV__)
      setShowStorybook(false)

      // Load the storybook UI once
      setStorybookUIRoot(() => require("./storybook").StorybookUIRoot)
    }
  }, [])

  if (showStorybook) {
    return StorybookUIRoot ? <StorybookUIRoot /> : null
  } else {
    return props.children
  }
}
