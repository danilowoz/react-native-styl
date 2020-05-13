/* eslint-disable no-console */
import React, { Component } from 'react'
import { ScrollView, View, Text } from 'react-native'
import 'react-native-console-time-polyfill'

import arr from './arr'
import { styl } from '../styl'

const Box = styl(View)({
  paddingTop: 5,
  paddingBottom: 5,
  borderBottomWidth: 1,
  borderBottomColor: 'grey',
})

const Label = styl(Text)({ color: 'red' })

class TestScreen extends Component {
  componentDidMount() {
    console.timeEnd('lib')
  }

  renderRow(row: any, index: any) {
    return (
      <Box key={index}>
        <Label>{row.name}</Label>
      </Box>
    )
  }

  renderScrollView() {
    console.log(`lib - Rendering ${arr.length} components`)

    return <ScrollView>{arr.map(this.renderRow)}</ScrollView>
  }

  render() {
    console.time('lib')

    return this.renderScrollView()
  }
}

export default TestScreen
