export type Destroyer = () => void

export default class PureHandlers {
  destroyers: Set<Destroyer>

  constructor() {
    this.destroyers = new Set<Destroyer>()
  }

  destroy(): void {
    this.destroyers.forEach((destroyer) => destroyer())
    this.destroyers.clear()
  }

  addDestroyer(destroyer: Destroyer) {
    this.destroyers.add(destroyer)
  }

  addEventListener<T extends Element | Window>(
    element: T,
    type: keyof HTMLElementEventMap | string,
    listener: (this: Element, ev: Event) => any,
    options: boolean | AddEventListenerOptions | undefined = {},
  ): Destroyer {
    element.addEventListener(type, listener, options)

    const destroyer: Destroyer = () => {
      element.removeEventListener(type, listener, options)
      this.destroyers.delete(destroyer)
    }

    this.destroyers.add(destroyer)

    return destroyer
  }
}
