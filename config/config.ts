import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  proxy: {
    '/quant': {
      'target': 'http://139.159.205.40:8808/',
      'changeOrigin': true,
      'pathRewrite': { '^/api': '/quant' },
    }
  },
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
      path: '/analyze',
      component: './Analyze',
      // routes: [
      //   {
      //     name: '风险模型数据应用',
      //     path: '/quant/model',
      //     routes: [
      //       {
      //         path: '/quant/model/analyze',
      //         name: '风险分析',
      //         component: './Analyze',
      //       }
      //     ]
      //   }
      // ]
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
    },
    {
      path: '/analyze/factordelite',
      component: './Analyze/components/Delite/FactorDelite.tsx',
      exact: true,
    },
    {
      path: '/analyze/strategy',
      component: './Analyze/components/Delite/Strategy.tsx',
      exact: true,
    }
  ],
  npmClient: 'yarn',
});

