// eslint-disable-next-line
import React, { useReducer } from 'react'
import { useChildSizes } from 'use-child-sizes'

import styles from './App.module.css'

interface DisplayState {
  store: string[]
  front: string[]
}

const initialState: DisplayState = {
  store: [
    'https://source.unsplash.com/F-gfrzSIPZo/1600x900',
    'https://source.unsplash.com/f68m3uHNT_A/1600x1600',
    'https://source.unsplash.com/xsIOCYmlI1g/900x1600',
    'https://source.unsplash.com/KMn4VEeEPR8/1600x1200',
    'https://source.unsplash.com/6ArTTluciuA/1200x1600'
  ],
  front: []
}

const reducer: (
  state: DisplayState,
  action: 'addRandom' | 'removeRandom'
) => DisplayState = ({ store, front }, action) => {
  switch (action) {
    case 'addRandom': {
      let times = Math.floor(Math.random() * (store.length + 1))
      let state = { store: [...store], front: [...front] }

      while (times-- > 0) {
        const storeIndex = Math.floor(Math.random() * state.store.length)
        const frontIndex = Math.floor(Math.random() * state.front.length + 1)

        state = {
          store: [
            ...state.store.slice(0, storeIndex),
            ...state.store.slice(storeIndex + 1)
          ],
          front: [
            ...state.front.slice(0, frontIndex),
            state.store[storeIndex],
            ...state.front.slice(frontIndex)
          ]
        }
      }

      return state
    }
    case 'removeRandom': {
      let times = Math.floor(Math.random() * (front.length + 1))
      let state = { store: [...store], front: [...front] }

      while (times-- > 0) {
        const storeIndex = Math.floor(Math.random() * state.store.length + 1)
        const frontIndex = Math.floor(Math.random() * state.front.length)

        state = {
          store: [
            ...state.store.slice(0, storeIndex),
            state.front[frontIndex],
            ...state.store.slice(storeIndex)
          ],
          front: [
            ...state.front.slice(0, frontIndex),
            ...state.front.slice(frontIndex + 1)
          ]
        }
      }

      return state
    }
  }
}

const App = () => {
  const [{ store, front }, dispatch] = useReducer(reducer, initialState)
  const [ref, sizes] = useChildSizes<HTMLUListElement>()

  return (
    <div>
      <div className={styles.App_Buttons}>
        <button onClick={() => dispatch('addRandom')} disabled={!store.length}>
          Add random
        </button>
        <button
          onClick={() => dispatch('removeRandom')}
          disabled={!front.length}
        >
          Remove random
        </button>
      </div>
      <div className={styles.App_SideBySide}>
        <ul className={styles.App_Images} ref={ref}>
          {front.map((url) => (
            <li key={url}>
              <img src={url} alt='' />
            </li>
          ))}
        </ul>
        <ul className={styles.App_Boxes}>
          {sizes.map(({ width, height }, i) => (
            <li
              key={i.toString()}
              style={{ paddingTop: `${(height / width) * 100}%` }}
            >
              <span>
                {width} × {height}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
