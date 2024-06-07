import { defineConfig } from '@umijs/max';
import { resolve } from 'path';
import defaultSettings from './defaultSettings';

export default defineConfig({
  esbuildMinifyIIFE: true,
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
    '/quent-api': {
      target: 'http://121.37.5.77:5001/api/quant/',
      changeOrigin: true,
      pathRewrite: { '^/quent-api': '' }
    },
    '/quant': {
      target: 'http://139.159.205.40:8808/',
      changeOrigin: true,
      pathRewrite: { '^/quant': '/quant' }
    },
    '/chat-api': {
      target: 'http://121.37.5.77:5005/',
      changeOrigin: true,
      pathRewrite: { '^/chat-api': '/api' }
    },
    '/app-api': {
      target: 'http://39.101.71.109/',
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
      name: 'Store',      
      path: '/store',
      component: './Store',
      routes: [
        {
          path: 'tasks',
          // name: '市场',
          component: './Store/views/chatflows'
        },
        {
          path: 'canvas',
          // name: '事件',
          component: './Store/views/canvas'
        },
        {
          path: 'canvas/:id',
          // name: '事件',
          component: './Store/views/canvas'
        },        
        {
          path: 'analyst',
          // name: '事件',
          component: './Store/views/marketplaces'
        },
        {
          path: 'analyst/:id',
          // name: '事件',
          component: './Store/views/marketplaces/MarketplaceCanvas'
        },        
        {
          path: 'skills',
          // name: '事件',
          component: './Store/views/agentflows'
        },
        {
          path: 'skills/:id',
          // name: '事件',
          component: './Store/views/agentflows'
        },           
        {
          path: 'tools',
          // name: '事件',
          component: './Store/views/tools'
        },   
        {
          path: 'tools/:id',
          // name: '事件',
          component: './Store/views/tools'
        },        
        {
          path: 'assistants',
          // name: '事件',
          component: './Store/views/assistants'
        },
        {
          path: 'credentials',
          // name: '事件',
          component: './Store/views/credentials'
        },
        {
          path: 'apikeys',
          // name: '事件',
          component: './Store/views/apikey'
        },
        {
          path: 'documents',
          // name: '事件',
          component: './Store/views/docstore'
        }
      ]    
    },
    {
      name: 'Quant',
      path: '/analyze',
      component: './Analyze'
    },
    {
      name: 'FinChat',
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
      path: '/home/developer',
      component: './Home/components/Developer',
      props: true,
      exact: true
    },
    {
      path: '/home/news',
      // name:'市场',
      // component: './Home/components/News',
      routes: [
        {
          path: 'market',
          // name: '市场',
          component: './Home/components/News/'
        },
        {
          path: 'events',
          // name: '事件',
          component: './Home/components/News/Events/'
        },
        {
          path: 'stocks',
          // name: '股票',
          component: './Home/components/News/Stocks/'
        },
        {
          path: 'mine',
          // name: '我的',
          component: './Home/components/News/Mine/'
        }
      ]
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
        },
        {
          path: 'user/pay-version',
          name: '更多功能',
          component: './UserInfo/PayVersion'
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
