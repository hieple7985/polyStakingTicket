import React from 'react';
import './global.css'

const GlobalStyles: React.FC<{children: React.ReactElement}> = ({children}): React.ReactElement => {
  return (<>{children}</>);
}

export default GlobalStyles;