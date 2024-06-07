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
            id: 'analyst',
            title: '分析员',
            type: 'item',
            url: '/store/analyst',
            icon: icons.IconBuildingStore,
            breadcrumbs: true
        },        
        {
            id: 'task',
            title: '任务',
            type: 'item',
            url: '/store/tasks',
            icon: icons.IconHierarchy,
            breadcrumbs: true
        },
        {
            id: 'skill',
            title: '技能',
            type: 'item',
            url: '/store/skills',
            icon: icons.IconUsersGroup,
            breadcrumbs: true,
            isBeta: true
        },
        {
            id: 'tools',
            title: '工具',
            type: 'item',
            url: '/store/tools',
            icon: icons.IconTool,
            breadcrumbs: true
        },
        {
            id: 'assistants',
            title: '模型',
            type: 'item',
            url: '/store/assistants',
            icon: icons.IconRobot,
            breadcrumbs: true
        },
        {
            id: 'credentials',
            title: '密钥管理',
            type: 'item',
            url: '/store/credentials',
            icon: icons.IconLock,
            breadcrumbs: true
        },
        {
            id: 'apikey',
            title: 'API管理',
            type: 'item',
            url: '/store/apikeys',
            icon: icons.IconKey,
            breadcrumbs: true
        },
        {
            id: 'document-stores',
            title: '文档资料',
            type: 'item',
            url: '/store/documents',
            icon: icons.IconFiles,
            breadcrumbs: true
        }
    ]
}

export default dashboard