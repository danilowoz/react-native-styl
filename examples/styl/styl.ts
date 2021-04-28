/* eslint-disable react/display-name */
import React, {
  ComponentType,
  createContext,
  createElement,
  forwardRef,
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  useContext,
} from 'react'
import { ViewStyle, TextStyle, ImageStyle, StyleProp } from 'react-native'

/**
 * Types definition
 *
 * @internal
 */

/**
 * For overlap `DefaultTheme` use:
 *
 * styl.d.ts
 *
 * declare module 'react-native-styl' {
 *  export interface DefaultTheme {
 *    colors: {
 *      main: string;
 *      secondary: string;
 *    };
 *  }
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DefaultTheme {}

// Theme
type StyleProperties = ViewStyle | TextStyle | ImageStyle

type StylesWithTheme<P> = (args: {
  props: P
  theme: DefaultTheme
}) => StyleProperties

type Styles<P> = StylesWithTheme<P> | StyleProperties

// Props
type DefaultProps = object & {
  as?: ComponentType<any>
  style?: StyleProp<StyleProperties>
  children?: ReactNode
}

// Polymorphic
interface Polymorphic<IntrinsicElement, OwnProps = {}> {
  <As extends ComponentType<any>>(
    props: As extends JSXElementConstructor<infer P>
      ? OwnProps & { ref?: As } & { as?: As } & P
      : IntrinsicElement extends JSXElementConstructor<infer E>
      ? OwnProps & { ref?: IntrinsicElement } & { as?: IntrinsicElement } & E
      : never
  ): ReactElement | null
}

/**
 * Context
 *
 * Create a context to provide the theme,
 * its initialize with an empty theme
 *
 * @internal
 */
const Context = createContext({ theme: {} })

/**
 * Provider
 *
 * It receives a theme as argument, to provide custom
 * variables to entire react component tree via context
 *
 * Usage:
 * ```jsx
 * const ThemeA: React.FC = ({ children }) => (
 *   <Provider theme={{ primary: 'blue' }}>
 *      {children}
 *   </Provider>
 * )
 * ```
 */
const Provider: React.FC<{ theme: DefaultTheme }> = ({ children, theme }) =>
  createElement(Context.Provider, { value: { theme }, children })

/**
 * useTheme
 *
 * Expose the `theme` as a React hook
 */
const useTheme = (): DefaultTheme => {
  const { theme } = useContext(Context)

  return theme
}

/**
 * styl
 *
 * Given a component as first argument, it return a function
 * which receives a callback with `theme` (from context) and `props`
 * from component and should be returned a CSSProperties which
 * will be passes as `style` attribute
 *
 * @example
 * ```tsx
 * const Title = styl(Text)(({ theme, props }) => ({
 *  paddingLeft: props.padding,
 *  color: theme.primary,
 * }));
 *
 * const BigTitle = styl(Title)({ fontSize: 40 })
 * ```
 */
const styl = <Comp extends ComponentType<any>>(Component: Comp) => <
  Props extends DefaultProps = DefaultProps
>(
  stylesProp: Styles<Props>
): Polymorphic<Comp, Props> => {
  return forwardRef(function ForwardedComponent(props: Props, ref) {
    // Get theme from context
    const { theme } = useContext(Context)

    // Spread props and inline styles
    const { style: inlineStyles = {}, as, ...restProps } = props

    // Check type of argument
    const styles =
      typeof stylesProp === 'function'
        ? stylesProp({ props, theme })
        : stylesProp

    // Create component
    return createElement<DefaultProps>(as || Component, {
      ...restProps,
      ref,
      style: [
        styles,
        ...(Array.isArray(inlineStyles) ? inlineStyles : [inlineStyles]),
      ],
    })
  })
}

export { styl, Provider, useTheme }
