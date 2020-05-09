/* eslint-disable no-console */
import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import styled from 'styled-components/native'
import 'react-native-console-time-polyfill'

import arr from './arr'

const Box = styled.View`
  padding-top: 5px;
  padding-bottom: 5px;
  border-bottom-width: 1px;
  border-bottom-color: grey;
`

const Label = styled.Text`
  color: red;
`

class TestScreen extends Component {
  componentDidMount() {
    console.timeEnd('Styled-components')
  }

  renderRow(row: any, index: any) {
    return (
      <Box key={index}>
        <Label>{row.name}</Label>
      </Box>
    )
  }

  renderScrollView() {
    console.log(`Styled-components - Rendering ${arr.length} components`)

    return <ScrollView>{arr.map(this.renderRow)}</ScrollView>
  }

  render() {
    console.time('Styled-components')

    return this.renderScrollView()
  }
}

export default TestScreen
