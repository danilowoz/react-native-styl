import React from 'react'
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native'

import Highlighter from './SyntaxHighlight'
import { Provider, styl } from '../styl'

/**
 * Pieces
 */
const Title = styl(Text)({
  fontSize: 18,
  fontWeight: '700',
  paddingTop: 32,
  paddingHorizontal: 16,
})

const DynamicText = styl(Text)<{ color: string }>(({ props }) => ({
  padding: 16,
  color: props.color,
}))

const Theme: React.FC = ({ children }) => (
  <Provider theme={{ primary: 'blue' }}>{children}</Provider>
)

const ColorTheme = styl(Text)(({ theme }) => ({
  color: theme.primary,
  padding: 16,
}))

const BaseText = styl(Text)({
  color: 'red',
})

const ExtendedText = styl(BaseText)({
  color: 'green',
  padding: 16,
})

const AsComp = styl(Text)({
  padding: 16
})

const PresetComp = styl((props) => (
  <Text ellipsizeMode="tail" numberOfLines={1} {...props} />
))({ padding: 16 })

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        {/*  */}
        <Title>Styling native elements</Title>
        <Highlighter>
          {`const Wrapper = styl(ScrollView)({ 
  padding: 16 
})

<Wrapper indicatorStyle="black">
  <View />
</Wrapper>`}
        </Highlighter>

        {/*  */}
        <Title>Dynamic styles</Title>
        <DynamicText color="red">Example of {`<DynamicText />`}</DynamicText>
        <Highlighter>
          {`const DynamicText = styl(Text)(({ props }) => ({
  color: props.color,
}))

<DynamicText color="red">Lorem ipsum</DynamicText>`}
        </Highlighter>

        {/*  */}
        <Title>Theming</Title>
        <Theme>
          <ColorTheme>Example of {`<ColorTheme />`}</ColorTheme>
        </Theme>
        <Highlighter>
          {`const Theme= ({ children }) => (
  <Provider theme={{ primary: 'blue' }}>
    {children}
  </Provider>
)

const ColorTheme = styl(Text)(({ theme }) => ({
  color: theme.primary
}))

<ColorTheme>Lorem ipsum</ColorTheme>`}
        </Highlighter>

        {/*  */}
        <Title>Extends components</Title>
        <ExtendedText>Example of {`<ExtendedText />`}</ExtendedText>
        <Highlighter>
          {`const BaseText = styl(Text)({
  color: 'red',
})

const ExtendedText = styl(BaseText)({
  color: 'green',
})

<ExtendedText>Lorem ipsum</ExtendedText>`}
        </Highlighter>

        {/*  */}
        <Title>Component presets</Title>
        <PresetComp>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum
          molestiae ducimus impedit doloremque accusantium quos, facere illum
          deserunt, aliquid dolor nostrum inventore ipsam voluptatum illo
          blanditiis. Minima quae perferendis dolore!
        </PresetComp>

        <Highlighter>
          {`const PresetComp = styl((props) => (
  <Text ellipsizeMode="tail" numberOfLines={1} {...props} />
))({ padding: 16 })

<PresetComp>Lorem ipsum</PresetComp>`}
        </Highlighter>

        {/*  */}
        <Title>`as` prop</Title>
        <AsComp as={TouchableOpacity}><Text>TouchableOpacity</Text></AsComp>

        <Highlighter>
          {`const AsComp = styl(Text)({
  padding: 16
})

<AsComp as={TouchableOpacity}><Text>TouchableOpacity</Text></AsComp>`}
        </Highlighter>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App
