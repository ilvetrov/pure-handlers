<p>
  <img src="https://raw.githubusercontent.com/ilvetrov/pure-handlers/main/logo.svg" width="206" height="90" />
</p>

PureHandlers is a helper to destroy all your handlers at once.

- [Basic](#basic)
- [Targeted Destroyer](#targeted-destroyer)
- [Your own Destroyers](#your-own-destroyers)
- [Your own targeted Destroyer](#your-own-targeted-destroyer)
- [React](#react)
- [React Hook](#react-hook)
- [Browser](#browser)

## Usage

### Basic

```js
import PureHandlers from 'pure-handlers'

const pureHandlers = new PureHandlers()

pureHandlers.addEventListener(window, 'scroll', (event) => {
  // your awesome logic
})

// Destroy all listeners
pureHandlers.destroy()
```

### Targeted Destroyer

```js
const destroyer = pureHandlers.setInterval(() => {
  // your awesome logs, for example
}, 1000)

// Destroy only this listener
destroyer()
```

### Your own Destroyers

```js
const listener = new MyAwesomeListener()

pureHandlers.addDestroyer(() => listener.myUnsubscribe())

// Destroy all listeners
pureHandlers.destroy()
```

### Your own targeted Destroyer

```js
const listener = new MyAwesomeListener()

const destroyer = pureHandlers.addDestroyer(() => listener.myUnsubscribe())

// Destroy only this listener
// and remove the destroyer from pureHandlers' list of destroyers
destroyer()
```

### React

```js
import PureHandlers from 'pure-handlers'

export default function MyOwnAwesomeClock() {
  const [second, setSecond] = useState(0)

  useEffect(() => {
    const pureHandlers = new PureHandlers()

    pureHandlers.setInterval(() => {
      setSecond((oldSecond) => oldSecond + 1)
    }, 1000)

    return () => pureHandlers.destroy()
  }, [])

  return <span>Current second: {second}</span>
}
```

### React Hook

With auto-destroy on unmount.

```js
import { usePureHandlers } from 'pure-handlers/react'

export default function MyOwnAwesomeClock() {
  const [second, setSecond] = useState(0)
  const pureHandlers = usePureHandlers()

  useEffect(() => {
    pureHandlers.setInterval(() => {
      setSecond((oldSecond) => oldSecond + 1)
    }, 1000)
  }, [])

  return <span>Current second: {second}</span>
}
```

### Browser

Or move the file to your libs directory.

```html
<script src="/node_modules/pure-handlers/dist/browser/pure-handlers.browser.min.js"></script>
<script>
  // PureHandlers is available globally now
  var pureHandlers = new PureHandlers()
</script>
```

## My Links

- [GitHub](https://github.com/ilvetrov)
- [Telegram](https://t.me/ilvetrov)
- [contact@ilve.site](mailto:contact@ilve.site)
