/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'

import { createStyle } from '../lib/createStyle'
import { ThemeA, ThemeB } from './theme'

const WithoutTheme = createStyle(Text)({
  color: 'black',
})

const Themed = createStyle(Text)(({ theme }) => ({
  color: theme.primary,
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
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
