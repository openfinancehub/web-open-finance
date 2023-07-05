import { defineConfig } from '@umijs/max';
import routes from './routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'Open Finance',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: 'Factors',
      path: '/home',
      component: './Home',
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
              component: './Analyze',
            }
          ]
        }
      ]
    },
    {
      name: ' FinChat',
      path: '/finchat',
      component: './Finchat',
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
  npmClient: 'yarn',
});

