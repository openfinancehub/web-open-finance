import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Open Finance'
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true
  },
  routes: [
    {
      name: '登录页',
      path: '/login',
      component: './Login',
      layout: false,
      hideInMenu: true
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      name: 'Factors',
      path: '/home',
      component: './Home'
    },
    {
      name: 'Quant',
      path: '/quant',
      routes: [
        {
          name: '风险模型数据应用',
          path: '/quant/model',
          routes: [
            {
              path: '/quant/model/analyze',
              name: '风险分析',
              component: './Analyze'
            }
          ]
        }
      ]
    },
    {
      name: ' FinChat',
      path: '/finchat',
      component: './Finchat'
    },
    {
      name: 'Users',
      path: '/user',
      routes: [
        {
          path: 'user/info',
          name: '个人信息',
          component: './UserInfo/Info'
        },
        {
          path: 'user/content',
          name: '发布内容',
          component: './UserInfo/Content'
        }
      ]
    }
  ],
  npmClient: 'yarn'
});
