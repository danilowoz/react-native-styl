import React, {
  ComponentType,
  ComponentPropsWithoutRef,
  createElement,
  CSSProperties,
  forwardRef,
  ReactNode,
  createContext,
  useContext,
} from 'react'

/**
 * * Types definition
 *
 * @internal
 */
type DefaultTheme = {}

type Styles<Props> = (args: {
  props: Props
  theme: DefaultTheme
}) => CSSProperties | CSSProperties

type ForwardedProps<
  Comp extends ComponentType<unknown>,
  Props extends object
> = ComponentPropsWithoutRef<Comp> & Props & { children?: ReactNode }

/**
 * * Context
 *
 * Create a context to provide the theme,
 * its initialize with an empty theme
 *
 * @internal
 */
const Context = createContext({ theme: {} })

/**
 * * Provider
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
 * * createStyle
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
) =>
  forwardRef<ThisType<Comp>, ForwardedProps<Comp, Props>>(
    function ForwardedComponent(props, ref) {
      const { theme } = useContext(Context)
      const { style: inlineStyles = {}, ...restProps } = props

      const styles =
        typeof stylesProp === 'function'
          ? stylesProp({ props, theme })
          : stylesProp

      return createElement(Component, {
        ...restProps,
        ref,
        style: [styles, inlineStyles],
      })
    }
  )

export { createStyle, Provider }
