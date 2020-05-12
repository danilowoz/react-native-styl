<h1 align="center">
 <img width="400" src="https://user-images.githubusercontent.com/4838076/81743123-187d6680-9499-11ea-91c5-952dc9bee4e7.png" alt="styl" />

  <br />
  <img src="https://badgen.net/npm/v/react-native-styl" alt="npm version" />
  <img src="https://david-dm.org/danilowoz/react-native-styl.svg" alt="dependencies" />
  <img src="https://badgen.net/bundlephobia/min/react-native-styl" alt="bundlephobia" />
</h1>

<p><strong><i>react-native-styl</i> is a micro-library for React Native developers</strong> whose goal is to write stylesheet with a non-opinionated library, free of dependencies, and in the easiest way possible.</p>

---

### Motivation

- **Keep the stylesheet simple:** the recommended approach to writing stylesheet in React Native still needs too much boilerplate and it's a pain to maintain; _styl_ provides a simple API where you'll be able to write the same stylesheet you've used to write so far in fewer lines of code;
- **Performance:** no trick or magic is happening into the library, it just set the stylesheet (which can come from inline-style, the function argument or even props) to style prop in the component; and it provides one of the most performative ways to write the stylesheet in React Native;
- **Versatility:** _styl_ uses the context API, which allows having fully supporting of theme, and share values throughout the application; also components can be easily extended and override styles whenever needed;
- **Ultralightweight:** less than 1kb.

### Usage

To getting start using react-native-styl, first install the package in your project:

`yarn add react-native-styl` or `npm i react-native-styl`

<details open>
<summary><strong>Styling native elements:</strong></summary>

_Styl_ is a regular function that receives whatever component that supports style prop, and returns another callback function where it expects a plain object stylesheet. So then it'll return a React component with the same props of the original component:

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

Create dynamic stylesheet easily passing custom props through the component and receives it in the callback:

```jsx
import styl from "react-native-styl"
import { Text } from "react-native"

const DynamicText = styl(Text)(({ props }) => ({
  color: props.color,
}))

<DynamicText color="red">Lorem ipsum</DynamicText>
```

</details>

<details>
<summary><strong>Theming:</strong></summary>

Adding the provider component at the top level of your applications, every component will have access to the `theme` prop into the callback function:

```jsx
import { styl, Provider as ProviderStyle } from "react-native-styl"
import { Text } from "react-native"

const Theme = ({ children }) => (
  <ProviderStyle theme={{ primary: 'blue' }}>
    {children}
  </ProviderStyle>
)

const ColorTheme = styl(Text)(({ theme }) => ({
  color: theme.primary
}))

<ColorTheme>Lorem ipsum</ColorTheme>
```

</details>

<details>
<summary><strong>Extends:</strong></summary>

Once _styl_ accepts any components which support style prop, every component created by the library can be style again. It'll inherit the original component style and it'll give the possibility to override them:

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
<summary><strong>Presets components:</strong></summary>

The first argument of react-native-styl accepts any kind of valid React component, that means it's possible to pass a custom function component:

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

react-native-styl fully supports TypeScript for both theme definitions and custom props.

Theme definition:
The first step is creating a declarations file with a proper name, `theme.d.ts` for example, with the following content:

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

Define the arguments of components and pass it to the main function:

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

</details>

<details>
<summary><strong>Styled-API-like:</strong></summary>

Create your custom library that fits your aim:

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

### Benchmark

In the internal tests rendering 5k views and 10k views into a Scrollview, _styl_ shows to be one of the most performative ways to write the stylesheet in React Native, losing only to the officially recommended approach for React Native community. The results below are the average of 5 completely renders measured in milliseconds:

| Library           | Rendering 5k Views | Rendering 10k Views |
| :---------------- | :----------------: | :-----------------: |
| StyleSheet        |       2068ms       |       4095ms        |
| Inline-style      |       2317ms       |       4507ms        |
| **react-native-styl**           |     **2754ms**     |     **5432ms**      |
| Styled-components |       3102ms       |       6460ms        |

> See the tests in `examples/src`

### Others benchmark that worth to mention:

- [A Quick Performance Comparison of Styled-Components vs Inline Styles in React Native](https://medium.com/@jm90mm/a-quick-performance-comparison-of-styled-components-vs-inline-styles-in-react-native-21d8f6a561d7)
- [react-native-css-in-js-benchmarks](https://github.com/brunolemos/react-native-css-in-js-benchmarks/blob/master/RESULTS.md)

### Inspiration

This package was inspired by the work from people's work on the following projects:

- [Why you don’t need Styled-Components in a React Native app, by Cameron Moss](https://medium.com/@fasterpancakes/how-styled-components-holds-up-to-refactoring-in-a-react-native-app-1922fa96ddd4)
- [Styled-components;](https://github.com/styled-components/styled-components)
- [Glamorous-native.](https://github.com/robinpowered/glamorous-native)

### License

[MIT License](https://opensource.org/licenses/MIT) © [Danilo Woznica](https://danilowoz.com/)
