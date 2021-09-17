# stable-hash

A small (496b) lib for stable hashing a JavaScript value. Originally created for [SWR](https://github.com/vercel/swr).

It's similar to `JSON.stringify(value)`, but:
1. `value` can be any JavaScript value
2. It sorts object keys

## Use

```bash
yarn add stable-hash
```

```js
import stableHash from 'stable-hash'

stableHash(anyJavaScriptValueHere) // returns a string
```

## Examples

### Primitive Value

```js
stableHash(1)
stableHash('foo')
stableHash(true)
stableHash(undefined)
stableHash(null)
stableHash(NaN)
```

BigInt:

```js
stableHash(1) === stableHash(1n)
stableHash(1) !== stableHash(2n)
```

Symbol:

```js
stableHash(Symbol.for('foo')) === stableHash(Symbol.for('foo'))
stableHash(Symbol.for('foo')) === stableHash(Symbol('foo'))
stableHash(Symbol('foo')) === stableHash(Symbol('foo'))
stableHash(Symbol('foo')) !== stableHash(Symbol('bar'))
```

_Since Symbols cannot be serialized, stable-hash simply uses its description as the hash._

### Regex

```js
stableHash(/foo/) === stableHash(/foo/)
stableHash(/foo/) !== stableHash(/bar/)
```

### Date

```js
stableHash(new Date(1)) === stableHash(new Date(1))
```

### Array

```js
stableHash([1, '2', [new Date(3)]]) === stableHash([1, '2', [new Date(3)]])
stableHash([1, 2]) !== stableHash([2, 1])
```

Circular:

```js
const foo = []
foo.push(foo)
stableHash(foo) === stableHash(foo)
```

### Object

```js
stableHash({ foo: 'bar' }) === stableHash({ foo: 'bar' })
stableHash({ foo: { bar: 1 } }) === stableHash({ foo: { bar: 1 } })
```

Stable:

```js
stableHash({ a: 1, b: 2, c: 3 }) === stableHash({ c: 3, b: 2, a: 1 })
```

Circular:

```js
const foo = {}
foo.foo = foo
stableHash(foo) === stableHash(foo)
```

### Function, Class, Set, Map, Buffer...

`stable-hash` guarantees reference consistency (`===`) for objects that the constructor isn't `Object`.

```js
const foo = () => {}
stableHash(foo) === stableHash(foo)
stableHash(foo) !== stableHash(() => {})
```

```js
class Foo {}
stableHash(Foo) === stableHash(Foo)
stableHash(Foo) !== stableHash(class {})
```

```js
const foo = new Set([1])
stableHash(foo) === stableHash(foo)
stableHash(foo) !== stableHash(new Set([1]))
```

## Notice

This function does something similar to serialization. It doesn't generate a secure checksum or digest, which usually has a fixed length and is hard to be reversed. With `stable-hash` it's likely possible to get the original data. Also, the output might include any charaters, not just alphabets and numbers like other hash algorithm. So:

- Use another encoding layer on top of it if you want to display the output. 
- Use another crypto layer on top of it if you want to have a secure and fixed length hash.

```js
import crypto from 'crypto'
import stableHash from 'stable-hash'

const hash = stableHash(anyJavaScriptValueHere)
const encodedHash = Buffer.from(hash).toString('base64')
const safeHash = crypto.createHash('MD5').update(hash).digest('hex')
```

## License

Created by Shu Ding. Released under the MIT License.
