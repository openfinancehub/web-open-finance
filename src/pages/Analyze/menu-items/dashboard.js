// assets
import {
  IconUsersGroup,
  IconHierarchy,
  IconBuildingStore,
  IconKey,
  IconTool,
  IconLock,
  IconRobot,
  IconVariable,
  IconFiles
} from '@tabler/icons-react'

// constant
const icons = { IconUsersGroup, IconHierarchy, IconBuildingStore, IconKey, IconTool, IconLock, IconRobot, IconVariable, IconFiles }

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: 'dashboard',
  title: '',
  type: 'group',
  children: [  
      {
          id: 'assess',
          title: '推荐因子',
          type: 'item',
          url: '/Analyze/Assess',
          icon: icons.IconUsersGroup,
          breadcrumbs: true
      },        
      {
          id: 'Strategy',
          title: '策略分析器',
          type: 'item',
          url: '/Analyze/Strategy',
          icon: icons.IconHierarchy,
          breadcrumbs: true
      },
      {
          id: 'Screen',
          title: '筛选列表',
          type: 'item',
          url: '/Analyze/Screen',
          icon: icons.IconUsersGroup,
          breadcrumbs: true,
      },
      {
          id: 'Factor',
          title: '量化因子',
          type: 'item',
          url: '/Analyze/Factor',
          icon: icons.IconTool,
          breadcrumbs: true
      },
      {
          id: 'Model',
          title: '模型',
          type: 'item',
          url: '/Analyze/Model',
          icon: icons.IconRobot,
          breadcrumbs: true
      },
  ]
}

export default dashboard
