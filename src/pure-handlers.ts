/**
 * Destroyer calls callback and removes itself from the list of destroyers.
 * So callback is called only once.
 */
export type Destroyer = () => void

export default class PureHandlers {
  private destroyers: Set<Destroyer>

  constructor() {
    this.destroyers = new Set<Destroyer>()
  }

  destroy(): void {
    this.destroyers.forEach((destroyer) => destroyer())
    // Just in case clear the Set. In TypeScript we cannot guarantee
    // that the function (Destroyer) contains self-removal mechanism
    this.destroyers.clear()
  }

  addDestroyer(callback: () => void): Destroyer {
    const destroyer: Destroyer = () => {
      callback()
      this.destroyers.delete(destroyer)
    }

    this.destroyers.add(destroyer)

    return destroyer
  }

  addEventListener<T extends Element | Window>(
    element: T,
    type: keyof HTMLElementEventMap | string,
    listener: (this: Element, ev: Event) => any,
    options: boolean | AddEventListenerOptions | undefined = {},
  ): Destroyer {
    element.addEventListener(type, listener, options)

    return this.addDestroyer(() => {
      element.removeEventListener(type, listener, options)
    })
  }

  setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): Destroyer {
    const timeoutId = setTimeout(() => callback(args), ms)

    return this.addDestroyer(() => {
      clearTimeout(timeoutId)
    })
  }

  setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): Destroyer {
    const intervalId = setInterval(() => callback(args), ms)

    return this.addDestroyer(() => {
      clearInterval(intervalId)
    })
  }
}
