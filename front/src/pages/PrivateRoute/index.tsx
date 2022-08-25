import { observer } from 'mobx-react-lite';
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<Props> = observer(({ element }: Props): React.ReactElement => {
  const auth = localStorage.getItem('private_route')
  const isLogin = localStorage.getItem('_NTS_V4_isLogin')
  const { pathname } = useLocation()


  const handleRedirect = () => {
    if (pathname === '/') return element
    // TODO: check if not account redirect to '/login
    else if (!JSON.parse(isLogin === null ? 'false' : isLogin)) {
      console.log('block private');

      return <Navigate to={'/login'} />
    }
    return element
  }
  return (
    auth
      ?
      handleRedirect()
      : <Navigate to="/private_route" />
  )
});

export default PrivateRoute