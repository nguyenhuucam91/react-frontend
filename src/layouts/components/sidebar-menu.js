import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'umi'
import { routes } from '@/constants/routes'

const { api } = routes;

const Sidebar = () => {
  return (
    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
      <Menu.Item key="1">
        <Link to={api.paths.category.all}>
          <Icon type="pie-chart" />
          <span>Category</span>
        </Link>
      </Menu.Item>
    </Menu>
  )
}

export default Sidebar
