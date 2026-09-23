import { useEffect, useRef, useState } from "react"

export const usePrevious = (count) => {
  // const [val, setVal] = useState(count)
  const prevRef = useRef()

  useEffect(() => {
    prevRef.current = count
  }, [count])

  return prevRef?.current
}