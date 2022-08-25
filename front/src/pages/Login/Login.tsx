import React from 'react'

import LoginForm from '../../components/Login/LoginForm'

const Login: React.FC = (): JSX.Element => {
  return (
    <div className='wrap border-x-only' >
      <LoginForm />
    </div>
  )
}

export default Login