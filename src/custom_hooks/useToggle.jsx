import { useCallback, useState } from "react"

export const useToggle = (initialValue) => {
  const [isOn, setIsOn] = useState(initialValue);
  console.log(isOn)

  const toggle = useCallback((value) => {
    if (typeof value=== 'boolean' ){
      setIsOn(value)
    }else{ setIsOn(prev => !prev)}
  }, [])

  return [isOn, toggle, setIsOn]
}