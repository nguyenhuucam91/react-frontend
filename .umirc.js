// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        {
          path: '/auth/login',
          component: './auth/login/index',
        },
        {
          path: '/dashboard',
          component: './dashboard/index',
        },
        {
          path: '/',
          component: '../pages/index',
        },
      ],
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: false,
        dynamicImport: {
          webpackChunkName: true,
        },
        title: 'react-frontend',
        dll: false,
        routes: {
          exclude: [/components\//],
        },
      },
    ],
  ],
};
