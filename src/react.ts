import { useEffect, useMemo } from 'react'
import PureHandlers from '.'

export default function usePureHandlers(): PureHandlers {
  const pureHandlers = useMemo(() => new PureHandlers(), [])

  useEffect(() => {
    return () => {
      pureHandlers.destroy()
    }
  }, [])

  return pureHandlers
}
