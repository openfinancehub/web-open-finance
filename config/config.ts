import { defineConfig } from '@umijs/max';
import { resolve } from 'path';
import defaultSettings from './defaultSettings';
import { ProfileOutlined,OrderedListOutlined,FundOutlined,ClusterOutlined,FileSearchOutlined,UngroupOutlined } from '@ant-design/icons';
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
      target: 'http://129.204.166.171:5002/api/v1/model/',
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
      name: '首页',
      path: '/home',
      component: './Home',
    },
    {
      name: '广场',
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
          component: './Store/views/skills'
        },
        {
          path: 'tools',
          // name: '事件',
          component: './Store/views/tools'
        },
        {
          path: 'llmfactors',
          // name: '事件',
          component: './Store/views/llmfactors'
        },
        {
          path: 'quantfactors',
          // name: '事件',
          component: './Store/views/quantfactors'
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
      name: '量化',
      path: '/analyze',
      
      routes:[
        {
          path: 'assess',
          name: '推荐因子',
          icon:'ProfileOutlined',
          component: './Analyze/Assess'
        },
        {
          path:'strategy',
          name:'策略分析器',
          icon:'FileSearchOutlined',
          components:'./Analyze/Strategy',
        },
        {
          path:'screen',
          name:'筛选列表',
          icon:'OrderedListOutlined',
          component:'./Analyze/Screen'
        },
        {
          path:'factor',
          name:'量化因子',
          icon:'UngroupOutlined',
          components:'./Analyze/Factor'
        },
       
        {
          path:'model',
          name:'模型',
          icon:'ClusterOutlined',
          components:'./Analyze/Model',
        },
       
      ],
     
    },
    {
      name: '问答',
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
      name: '用户',
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
  ],
  npmClient: 'yarn'
});
