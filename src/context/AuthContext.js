import React, { useContext } from 'react'
import { useAsync } from '@umijs/hooks'
import authService from '@/services/authService'

const AuthenticatedUser = React.createContext(null)

const AuthContextProvider = (props) => {


  const { data } = useAsync(() => authService.user(), [])

  return (
    <>
      {
        data && data.success &&
          <AuthenticatedUser.Provider value={{ user: data.data.user }}>
            {props.children}
          </AuthenticatedUser.Provider>
      }
    </>
  )
}

const useAuth = () => {
  const result = useContext(AuthenticatedUser)

  if (!AuthenticatedUser) {
    throw new Error('Auth context is not set')
  }

  return result
}


export { useAuth, AuthContextProvider }
