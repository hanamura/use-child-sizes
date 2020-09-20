# use-child-sizes

> A React hook to get the sizes of child elements of the specified element.

[![NPM](https://img.shields.io/npm/v/use-child-sizes.svg)](https://www.npmjs.com/package/use-child-sizes)

## Install

```bash
npm install use-child-sizes
```

## Usage

```tsx
import React from 'react'
import useChildSizes from 'use-child-sizes'

const Example = () => {
  const [ref, sizes] = useChildSizes<HTMLUListElement>()
  const maxHeight = sizes.reduce(
    (maxHeight, { height }) => (height > maxHeight ? height : maxHeight),
    0
  )

  return (
    <ul ref={ref} style={{ height: maxHeight }} className='...'>
      <li>
        <img src='...' />
      </li>
      <li>
        <img src='...' />
      </li>
      <li>
        <img src='...' />
      </li>
    </ul>
  )
}
```

### IE?

Use [ResizeObserver Polyfill](https://github.com/que-etc/resize-observer-polyfill).

## License

MIT © [Taro Hanamura](https://github.com/hanamura)
