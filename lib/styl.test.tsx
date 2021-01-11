import React, { useRef } from 'react'
import { Text, TouchableWithoutFeedback } from 'react-native'
import renderer from 'react-test-renderer'
import { renderHook } from '@testing-library/react-hooks'

import { styl, Provider, useTheme } from '.'

describe('styl', () => {
  describe('render', () => {
    it('renders correctly', () => {
      const Title = styl(Text)({})
      const tree = renderer.create(<Title />).toJSON()

      expect(tree).toMatchSnapshot()
    })

    it('renders a type of original component', () => {
      const Title = styl(Text)({})
      const tree = renderer.create(<Title />).toJSON()

      expect(tree?.type).toBe('Text')
      expect(tree).toMatchSnapshot()
    })
  })

  describe('style', () => {
    it('accepts inline style', () => {
      const GOAL = 'blue'
      const Title = styl(Text)({})
      const render = renderer.create(<Title style={{ color: GOAL }} />)

      // Check tree
      const tree = render.toTree()
      expect(tree?.props.style.color).toBe(GOAL)

      // Snapshot
      const json = render.toJSON()
      expect(json).toMatchSnapshot()
    })

    it('its inline style override the original style', () => {
      const WRONG = 'red'
      const GOAL = 'blue'
      const Title = styl(Text)({ color: WRONG })
      const render = renderer.create(<Title style={{ color: GOAL }} />)

      // Check tree
      const tree = render.toTree()
      expect(tree?.props.style.color).toBe(GOAL)

      // Snapshot
      const json = render.toJSON()
      expect(json).toMatchSnapshot()
    })

    it('empty inline style does not remove the original style', () => {
      const GOAL = 'blue'
      const Title = styl(Text)({ color: GOAL })
      const render = renderer.create(<Title style={{}} />)

      // Check tree
      const tree = render.toTree()
      expect(tree?.props.style.color).toBe(GOAL)

      // Snapshot
      const json = render.toJSON()
      expect(json).toMatchSnapshot()
    })
  })

  describe('props', () => {
    it('renders custom props', () => {
      const GOAL = 'blue'
      const Title = styl(Text)<{ color: string }>(({ props }) => ({
        color: props.color,
      }))
      const render = renderer.create(<Title color={GOAL} />)

      // Check tree
      const tree = render.toTree()
      expect(tree?.props.style.color).toBe(GOAL)

      // Snapshot
      const json = render.toJSON()
      expect(json).toMatchSnapshot()
    })

    it('`as` prop works properly', () => {
      const ORIGINAL = Text
      const GOAL = TouchableWithoutFeedback

      const fn = jest.fn()
      const Comp = styl(ORIGINAL)({ color: 'blue' })

      const render = renderer.create(
        <Comp as={GOAL} onPress={fn}>
          <Text>TouchableWithoutFeedback</Text>
        </Comp>
      )

      // Check tree
      const tree = render.toTree()
      expect(tree?.instance instanceof GOAL).toBe(true)

      // Snapshot
      const json = render.toJSON()
      expect(json).toMatchSnapshot()

      // Event onPress has been called
      tree?.props.onPress()
      expect(fn).toBeCalled()
    })
  })

  describe('theme/provider', () => {
    it('gets the color from theme', () => {
      const GOAL = 'blue'

      const ProviderTheme: React.FC = ({ children }) => (
        <Provider theme={{ primary: GOAL }}>{children}</Provider>
      )

      const Title = styl(Text)(({ theme }: any) => ({
        color: theme.primary,
      }))

      const render = renderer
        .create(
          <ProviderTheme>
            <Title />
          </ProviderTheme>
        )
        .toJSON()

      expect(render?.props.style.color).toBe(GOAL)
      expect(render).toMatchSnapshot()
    })

    it('gets the color from nested theme', () => {
      const WRONG_COLOR = 'red'
      const GOAL = 'blue'

      const ThemeA: React.FC = ({ children }) => (
        <Provider theme={{ primary: WRONG_COLOR }}>{children}</Provider>
      )

      const ThemeB: React.FC = ({ children }) => (
        <Provider theme={{ primary: GOAL }}>{children}</Provider>
      )

      const Title = styl(Text)(({ theme }: any) => ({
        color: theme.primary,
      }))

      const render = renderer
        .create(
          <ThemeA>
            <ThemeB>
              <Title />
            </ThemeB>
          </ThemeA>
        )
        .toJSON()

      expect(render?.props.style.color).toBe(GOAL)
      expect(render).toMatchSnapshot()
    })

    it('useTheme', () => {
      const theme = { color: 'red' }
      const wrapper: React.FC = ({ children }) => (
        <Provider theme={theme}>{children}</Provider>
      )

      const { result } = renderHook(() => useTheme(), { wrapper })

      expect((result.current as typeof theme).color).toBe(theme.color)
    })
  })

  describe('ref', () => {
    it('gets proper ref', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let ref: any

      const Title = styl(Text)({})

      const Element = () => {
        ref = useRef<Text>()
        return <Title ref={ref} />
      }

      renderer.create(<Element />).toJSON()

      expect(ref.current instanceof Text).toBe(true)
    })
  })
})
