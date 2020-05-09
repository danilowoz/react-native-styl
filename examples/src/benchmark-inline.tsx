/* eslint-disable no-console */
import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import 'react-native-console-time-polyfill'

import arr from './arr'

class TestScreen extends Component {
  componentDidMount() {
    console.timeEnd('inline-style')
  }

  renderRow(row: any, index: any) {
    return (
      <View
        style={{
          paddingTop: 5,
          paddingBottom: 5,
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
        }}
        key={index}
      >
        <Text style={{ color: 'red' }}>{row.name}</Text>
      </View>
    )
  }

  renderScrollView() {
    console.log(`Inline - Rendering ${arr.length} components`)

    return <ScrollView>{arr.map(this.renderRow)}</ScrollView>
  }

  render() {
    console.time('inline-style')

    return this.renderScrollView()
  }
}

export default TestScreen
