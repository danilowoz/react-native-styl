import React, { createContext } from 'react'

const Context = createContext({ theme: {} })

const Provider: React.FC<{ theme: Record<string, unknown> }> = ({
  children,
  theme,
}) => {
  return <Context.Provider value={{ theme }}>{children}</Context.Provider>
}

export { Provider, Context }
