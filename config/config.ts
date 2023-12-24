import { defineConfig } from '@umijs/max';
import { resolve } from 'path';
import defaultSettings from './defaultSettings';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  theme: {
    '@border-radius-base': '8px'
  },
  alias: {
    '@': resolve(__dirname, '../src')
  },
  layout: {
    title: 'Open Finance',
    ...defaultSettings
  },
  proxy: {
    '/api': {
      target: 'http://121.37.5.77:5003',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' }
    },
    '/quant': {
      target: 'http://139.159.205.40:8808/',
      changeOrigin: true,
      pathRewrite: { '^/api': '/quant' }
    },
    '/app-api': {
      target: 'http://39.101.71.109',
      changeOrigin: true,
      pathRewrite: { '^/app-api': '/app-api' }
    }
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
      path: '/analyze',
      component: './Analyze'
      // routes: [
      //   {
      //     name: '风险模型数据应用',
      //     path: '/quant/model',
      //     routes: [
      //       {
      //         path: '/quant/model/analyze',
      //         name: '风险分析',
      //         component: './Analyze'
      //       }
      //     ]
      //   }
      // ]
    },
    {
      name: ' FinChat',
      path: '/finchat',
      component: './Finchat'
    },
    {
      path: '/home/model/item',
      component: './Home/components/ModelsItems/',
      props: true,
      exact: true
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
      exact: true
    },
    {
      path: '/analyze/strategy',
      component: './Analyze/components/Delite/Strategy.tsx',
      exact: true
    }
  ],
  npmClient: 'yarn'
});
