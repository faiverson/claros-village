'use client'

import { useCallback } from 'react'

/**
 * A custom hook that provides smooth scrolling functionality to anchor links
 * @returns A function that handles smooth scrolling when clicking on anchor links
 */
export const useSmoothScroll = () => {
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only process anchor links (those starting with #)
    if (href.startsWith('#')) {
      e.preventDefault()

      // Get the target element
      const targetId = href.substring(1) // Remove the # character
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Scroll to the target element smoothly
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })

        // Update the URL without causing a page reload
        window.history.pushState({}, '', href)
      }
    }
  }, [])

  return scrollToSection
}

export default useSmoothScroll
