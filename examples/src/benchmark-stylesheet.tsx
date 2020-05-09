/* eslint-disable no-console */
import React, { Component } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import 'react-native-console-time-polyfill'

import arr from './arr'

const styles = StyleSheet.create({
  row: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  text: {
    color: 'red',
  },
})

class TestScreen extends Component {
  componentDidMount() {
    console.timeEnd('StyleSheet')
  }

  renderRow(row: any, index: any) {
    return (
      <View style={styles.row} key={index}>
        <Text style={styles.text}>{row.name}</Text>
      </View>
    )
  }

  renderScrollView() {
    console.log(`StyleSheet - Rendering ${arr.length} components`)

    return <ScrollView>{arr.map(this.renderRow)}</ScrollView>
  }

  render() {
    console.time('StyleSheet')

    return this.renderScrollView()
  }
}

export default TestScreen
