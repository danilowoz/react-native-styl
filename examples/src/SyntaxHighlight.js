import React from 'react'
import SyntaxHighlighter from 'react-native-syntax-highlighter'

const Highlighter = ({ children }) => {
  return (
    <SyntaxHighlighter language="javascript" highlighter={'prism' || 'hljs'}>
      {children}
    </SyntaxHighlighter>
  )
}

export default Highlighter
