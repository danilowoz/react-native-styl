import React from 'react'

import { Provider } from '../lib/createStyle'

const ThemeA: React.FC = ({ children }) => (
  <Provider theme={{ primary: 'blue' }}>{children}</Provider>
)

const ThemeB: React.FC = ({ children }) => (
  <Provider theme={{ primary: 'red' }}>{children}</Provider>
)

export { ThemeA, ThemeB }
