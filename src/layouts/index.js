import React from 'react'
import { routes } from '@/constants/routes'
import { Layout } from 'antd'
import { AuthContextProvider } from '@/context/AuthContext'
import UserMenu from './components/user-menu'
import Sidebar from './components/sidebar-menu'
import { buildRelativeUrl } from '@/utils/url'

const { Header, Content, Footer, Sider } = Layout

function BasicLayout(props) {
  if (props.location.pathname === buildRelativeUrl(routes.api.paths.authenticate.login)) {
    return <>{props.children}</>
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <AuthContextProvider>
        {/* End user */}
        <Sider collapsible collapsed={false} onCollapse={null}>
          <div className="logo" />
          {/* Sidebar */}
          <Sidebar />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} >
            <UserMenu></UserMenu>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            {props.children}
          </Content>

          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </AuthContextProvider>
    </Layout>
  );
}

export default BasicLayout;
