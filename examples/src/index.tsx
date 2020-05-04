import React from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'

import { Provider, createStyle } from '../createStyle'

type TempTheme = { theme: { primary: string } }

const ThemeA: React.FC = ({ children }) => (
  <Provider theme={{ primary: 'blue' }}>{children}</Provider>
)

const ThemeB: React.FC = ({ children }) => (
  <Provider theme={{ primary: 'red' }}>{children}</Provider>
)

const WithoutTheme = createStyle(Text)({
  color: 'black',
})

const Themed = createStyle(Text)(({ theme }: TempTheme) => ({
  color: theme.primary,
}))

const ColorFromProp = createStyle(Text)<{ color: string }>(({ props }) => ({
  color: props.color,
}))

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <WithoutTheme>Without theme</WithoutTheme>
        <ThemeA>
          <Themed>Theme</Themed>

          <ThemeB>
            <Themed>Nested theme</Themed>
          </ThemeB>
        </ThemeA>

        <ColorFromProp color="red">Red</ColorFromProp>
        <ColorFromProp color="blue">Blue</ColorFromProp>

        {/* With native attrs */}
        <ColorFromProp allowFontScaling color="blue">
          Blue
        </ColorFromProp>

        {/* With style attrs */}
        <ColorFromProp color="blue" style={{ color: 'green' }}>
          Blue
        </ColorFromProp>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
