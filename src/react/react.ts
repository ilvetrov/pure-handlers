import { useEffect, useMemo } from 'react'
import PureHandlers from '../pure-handlers'

export function usePureHandlers(): PureHandlers {
  const pureHandlers = useMemo(() => new PureHandlers(), [])

  useEffect(() => {
    return () => {
      pureHandlers.destroy()
    }
  }, [])

  return pureHandlers
}
