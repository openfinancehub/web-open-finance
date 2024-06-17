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
      target: 'http://129.204.166.171:5002/api/info/',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' }
    },
    '/quent-api': {
      target: 'http://129.204.166.171:5002/api/quant/',
      changeOrigin: true,
      pathRewrite: { '^/quent-api': '' }
    },
    '/quant': {
      target: 'http://8.138.96.163:8081/',
      changeOrigin: true,
      pathRewrite: { '^/quant': '/quant' }
    },
    '/chat-api': {
      target: 'http://129.204.166.171:5002/api/',
      changeOrigin: true,
      pathRewrite: { '^/chat-api': '/info' }
    },
    '/app-api': {
      target: 'http://114.132.71.128/',
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
          path: 'chatflows',
          // name: '市场',
          component: './Store/views/chatflows'
        },
        {
          path: 'chatflows/:id',
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
          path: 'marketplaces',
          // name: '事件',
          component: './Store/views/marketplaces'
        },
        {
          path: 'marketplaces/:id',
          // name: '事件',
          component: './Store/views/marketplaces/MarketplaceCanvas'
        },
        {
          path: 'agents',
          // name: '事件',
          component: './Store/views/agents'
        },                 
        {
          path: 'skills',
          // name: '事件',
          component: './Store/views/chatflows'
        },
        {
          path: 'skills/:id',
          // name: '事件',
          component: './Store/views/chatflows'
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
      path: '/home/news/events/info',
      component: './Home/components/News/Events/event.tsx',
      props: true,
      exact: true
    },
    {
      path: '/home/news/market',
      name: 'Market',
      component: './Home/components/News',
      // routes: [
      //   {
      //     path: 'market',
      //     // name: '市场',
      //     component: './Home/components/News/'
      //   },
      //   {
      //     path: 'events',
      //     // name: '事件',
      //     component: './Home/components/News/Events/'
      //   },
      //   {
      //     path: 'stocks',
      //     // name: '股票',
      //     component: './Home/components/News/Stocks/'
      //   },
      //   {
      //     path: 'mine',
      //     // name: '我的',
      //     component: './Home/components/News/Mine/'
      //   }
      // ]
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
