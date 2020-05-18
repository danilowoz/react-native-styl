<h1 align="center">
 <img width="400" src="https://user-images.githubusercontent.com/4838076/81743123-187d6680-9499-11ea-91c5-952dc9bee4e7.png" alt="styl" />

  <br />
  <img src="https://badgen.net/npm/v/react-native-styl" alt="npm version" />
  <img src="https://david-dm.org/danilowoz/react-native-styl.svg" alt="dependencies" />
  <img src="https://badgen.net/bundlephobia/min/react-native-styl" alt="bundlephobia" />
</h1>

<p><strong><i>react-native-styl</i> is a micro-library for React Native developers</strong> whose goal is to write stylesheets with a non-opinionated library, free of dependencies, and in the easiest way possible.</p>

```jsx
import styl from 'react-native-styl'
import { Text } from 'react-native'

const Title = styl(Text)({ color: 'blue' })

const App = () => <Title>Styl</Title>
```

---

## Motivation

- **Keep the stylesheet simple:** the recommended approach to writing stylesheets in React Native still needs too much boilerplate and it's a pain to maintain; _styl_ provides a simple API where you'll be able to write the same stylesheets you are used to – with fewer lines of code;

- **Performance:** no magic or tricks here, _styl_ just maps the stylesheet (which can come from inline-style, the function argument or even props) to the style prop in the component: one of the most performative ways to write styles in React Native;

- **Versatility:** _styl_ uses the context API to bring full theme support, which can be used throughout the application; components can also be easily extended and styled overrided when needed;

- **Ultralightweight:** about 1kb.

## Usage

To get started using `react-native-styl`, first install the package:

`yarn add react-native-styl` or `npm i react-native-styl`

<details open>
<summary><strong>Styling native elements:</strong></summary>

_Styl_ is a high-order function that receives any component that supports the `style` prop, and returns a function that expects a plain object stylesheet. It will return a styled React component with the same props of the original component:

```jsx
import styl from "react-native-styl"
import { ScrollView } from "react-native"

const Wrapper = styl(ScrollView)({
  padding: 16
})

<Wrapper indicatorStyle="black">
  <View />
</Wrapper>
```

</details>

<details open>
<summary><strong>Dynamic styles:</strong></summary>

Easily create dynamic stylesheets. Use a callback function to access the component `props` when creating the styles:

```jsx
import styl from "react-native-styl"
import { Text } from "react-native"

const ColoredText = styl(Text)(({ props }) => ({
  color: props.color,
}))

<ColoredText color="red">Lorem ipsum</ColoredText>
```

</details>

<details>
<summary><strong>Theming:</strong></summary>

Wrap your application with the Provider and every component will also have access to the `theme` in the callback function:

```jsx
import { styl, Provider as StyleProvider } from "react-native-styl"
import { Text } from "react-native"

const Theme = ({ children }) => (
  <StyleProvider theme={{ primary: 'blue' }}>
    {children}
  </StyleProvider>
)

const ThemeColorText = styl(Text)(({ theme }) => ({
  color: theme.primary
}))

<ThemeColorText>Lorem ipsum</ThemeColorText>
```

</details>

<details>
<summary><strong>Extends:</strong></summary>

Given that _styl_ accepts any component that supports the `style` prop, every component created by the library can be styled again. It will inherit the original component style that can be extended:

```jsx
import styl from "react-native-styl"
import { Text } from "react-native"

const BaseText = styl(Text)({
  color: 'red',
  padding: 16,
})

const ExtendedText = styl(BaseText)({
  color: 'green',
})

<ExtendedText>Lorem ipsum</ExtendedText>
```

</details>

<details>
<summary><strong>`as` prop:</strong></summary>

Render a new styled component passing a valid React component to `as` prop:

```jsx
import styl from "react-native-styl"
import { Text, TouchableOpacity } from "react-native"

const Base = styl(Text)({
  padding: 16
})

<Base as={TouchableOpacity} onPress={() => null}>
  <Text>TouchableOpacity</Text>
</Base>
```

> Typescript is not yet supported [Help is needed to implement it](https://github.com/danilowoz/react-native-styl/issues/3).

</details>

<details>
<summary><strong>Presets components:</strong></summary>

The first argument of `react-native-styl` accepts any valid React component. This means it's possible to pass a custom function component:

```jsx
import styl from "react-native-styl"
import { Text } from "react-native"

const PresetComp = styl((props) => (
  <Text ellipsizeMode="tail" numberOfLines={1} {...props} />
))({ padding: 16 })

<PresetComp>Lorem ipsum</PresetComp>
```

</details>

<details>
<summary><strong>TypeScript:</strong></summary>

`react-native-styl` fully supports TypeScript for both theme definitions and custom props.

Theme definition:
The first step is to create a declarations file (e.g.: `theme.d.ts`), with the following content:

```jsx
// import original module declarations
import 'react-native-styl'

// and extend it
declare module 'react-native-styl' {
  export interface DefaultTheme {
    colors: {
      main: string
      secondary: string
    }
  }
}
```

#### Custom props:

Define the component props and pass it to the main function:

```jsx
import styl from "react-native-styl"
import { Text } from "react-native"

interface TitleProps {
   color: string
}

const Title = styl(Text)<TitleProps>(({ props }) => ({
  color: props.color,
}))

<Title color="blue">Lorem ipsum</Title>
```

#### `as` prop

Typescript is not yet supported [Help is needed to implement it](https://github.com/danilowoz/react-native-styl/issues/3).

</details>

<details>
<summary><strong>Styled-API-like:</strong></summary>

Create a custom library to suit your own goals:

```jsx
import styl from 'react-native-styl'
import * as RN from 'react-native'

const UI = {
  View: styl(RN.View),
  Text: styl(RN.Text),
}

const Title = UI.Text({ color: 'red' })
```

</details>

**More examples in `examples/src`.**

---

## Benchmark

Internal tests rendering 5k views and 10k views into a Scrollview, _styl_ shows to be one of the most performative ways to write stylesheets in React Native, losing only to the native approaches. The results below are the average of 5 complete renders measured in milliseconds:

| Library               | Rendering 5k Views | Rendering 10k Views |
| :-------------------- | :----------------: | :-----------------: |
| StyleSheet            |       2068ms       |       4095ms        |
| Inline-style          |       2317ms       |       4507ms        |
| **react-native-styl** |     **2754ms**     |     **5432ms**      |
| Styled-components     |       3102ms       |       6460ms        |

> See the tests in `examples/src`

### Others benchmarks that are worth mentioning:

- [A Quick Performance Comparison of Styled-Components vs Inline Styles in React Native](https://medium.com/@jm90mm/a-quick-performance-comparison-of-styled-components-vs-inline-styles-in-react-native-21d8f6a561d7)
- [react-native-css-in-js-benchmarks](https://github.com/brunolemos/react-native-css-in-js-benchmarks/blob/master/RESULTS.md)

### Inspiration:

This package was inspired by people's work on the following projects:

- [Why you don’t need Styled-Components in a React Native app, by Cameron Moss](https://medium.com/@fasterpancakes/how-styled-components-holds-up-to-refactoring-in-a-react-native-app-1922fa96ddd4)
- [Styled-components;](https://github.com/styled-components/styled-components)
- [Glamorous-native.](https://github.com/robinpowered/glamorous-native)

### Special thanks to:
- [Airfordable](https://github.com/Airfordable);
- [Significa](https://github.com/significa).

### License:

[MIT License](https://opensource.org/licenses/MIT) © [Danilo Woznica](https://danilowoz.com/)
