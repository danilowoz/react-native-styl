/* eslint-disable react/display-name */
import React, {
  ComponentPropsWithoutRef,
  ComponentType,
  createContext,
  createElement,
  forwardRef,
  ReactNode,
  useContext,
} from 'react'
import { ViewStyle, TextStyle, ImageStyle } from 'react-native'

/**
 * Types definition
 *
 * @internal
 */

/**
 * For overlap `DefaultTheme` use:
 *
 * create-style.d.ts
 *
 * declare module 'create-style' {
 *  export interface DefaultTheme extends MyCustomTheme {}
 * }
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DefaultTheme = any

// Style
type StyleProperties = ViewStyle | TextStyle | ImageStyle

type StylesWithTheme<P> = (args: {
  props: P
  theme: DefaultTheme
}) => StyleProperties

type Styles<P> = StylesWithTheme<P> | StyleProperties

type ForwardedProps<
  Comp extends ComponentType<unknown>,
  Props extends object
> = ComponentPropsWithoutRef<Comp> & Props & { children?: ReactNode }

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
const Provider: React.FC<{ theme: Record<string, unknown> }> = ({
  children,
  theme,
}) => createElement(Context.Provider, { value: { theme }, children })

/**
 * createStyle
 *
 * Given a component as first argument, it return a function
 * which receives a callback with `theme` (from context) and `props`
 * from component and should be returned a CSSProperties which
 * will be passes as `style` attribute
 *
 * @example
 * ```tsx
 * const Title = createStyle(Text)(({ theme, props }) => ({
 *  paddingLeft: props.padding,
 *  color: theme.primary,
 * }));
 *
 * const BigTitle = createStyle(Title)({ fontSize: 40 })
 * ```
 */
const createStyle = <Comp extends ComponentType<any>>(Component: Comp) => <
  Props extends object = object
>(
  stylesProp: Styles<Props>
) => {
  return forwardRef<unknown, ForwardedProps<Comp, Props>>(
    function ForwardedComponent(props, ref) {
      // Get theme from context
      const { theme } = useContext(Context)

      // Spread props and inline styles
      const { style: inlineStyles = {}, ...restProps } = props

      // Check type of argument
      const styles =
        typeof stylesProp === 'function'
          ? stylesProp({ props, theme })
          : stylesProp

      // Create component
      return createElement(Component, {
        ...restProps,
        ref,
        style: { ...styles, ...inlineStyles },
      })
    }
  )
}

export { createStyle, Provider }
