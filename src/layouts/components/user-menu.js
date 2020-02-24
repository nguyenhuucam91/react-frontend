import React from 'react'
import SubMenu from "antd/lib/menu/SubMenu"
import { Menu } from "antd"
import { useAuth } from "@/context/AuthContext"
import { LOCAL_STORAGE_AUTH_PREFIX, AUTH_TOKEN_KEY } from '@/utils/request'
import { router } from 'umi'
import { routes } from '@/constants/routes'


const UserMenu = () => {

  const { user } = useAuth()

  const logout = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_PREFIX + AUTH_TOKEN_KEY)
    router.push(routes.api.paths.authenticate.login)
  }

  return (
    <Menu mode="horizontal">
      <SubMenu
        key="user"
        style={{ lineHeight: '64px', float: 'right'}}
        title={
          <span className="submenu-title-wrapper">
            Welcome: { user.name }
          </span>
        }
      >
          <Menu.Item onClick={logout}>Logout</Menu.Item>
    </SubMenu>
  </Menu>
  )
}

export default UserMenu
