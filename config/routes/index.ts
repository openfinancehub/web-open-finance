import {
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from '@ant-design/icons';

export default {

    routes: [
      {
        path: '/welcome',
        name: 'Models',
        // icon: <SmileFilled />,
        component: './Welcome',
      },
      {
        path: '/dataBase',
        name: '管理页',
        // icon: <CrownFilled />,
        component: './DataBase',
        // routes: [
        //   {
        //     path: '/admin/sub-page1',
        //     name: '一级页面',
        //     icon: 'https://gw.alipayobjects.com/zos/antfincdn/upvrAjAPQX/Logo_Tech%252520UI.svg',
        //     component: './Welcome',
        //   },
        //   {
        //     path: '/admin/sub-page2',
        //     name: '二级页面',
        //     // icon: <CrownFilled />,
        //     component: './DataBase',
        //   },
        //   {
        //     path: '/admin/sub-page3',
        //     name: '三级页面',
        //     // icon: <CrownFilled />,
        //     component: './Table',
        //   },
        // ],
      },
      {
        name: '列表页',
        // icon: <TabletFilled />,
        path: '/list',
        component: './Table',
        // routes: [
        //   {
        //     path: '/list/sub-page',
        //     name: '列表页面',
        //     // icon: <CrownFilled />,
        //     routes: [
        //       {
        //         path: 'sub-sub-page1',
        //         name: '一一级列表页面',
        //         // icon: <CrownFilled />,
        //         component: './Welcome',
        //       },
        //       {
        //         path: 'sub-sub-page2',
        //         name: '一二级列表页面',
        //         // icon: <CrownFilled />,
        //         component: './Welcome',
        //       },
        //       {
        //         path: 'sub-sub-page3',
        //         name: '一三级列表页面',
        //         // icon: <CrownFilled />,
        //         component: './Welcome',
        //       },
        //     ],
        //   },
        //   // {
        //   //   path: '/list/sub-page2',
        //   //   name: '二级列表页面',
        //   //   // icon: <CrownFilled />,
        //   //   component: './Welcome',
        //   // },
        //   // {
        //   //   path: '/list/sub-page3',
        //   //   name: '三级列表页面',
        //   //   // icon: <CrownFilled />,
        //   //   component: './Welcome',
        //   // },
        // ],
      },
    ],
};