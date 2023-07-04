import {
  CrownFilled,
  SmileFilled,
  TabletFilled,
} from '@ant-design/icons';

export default {
  route: {
    path: '/',
    routes: [
      {
        path: '/welcome',
        name: 'Models',
        icon: <SmileFilled />,
        component: './Welcome',
      },
      {
        path: '/dataBase',
        name: '管理页',
        icon: <CrownFilled />,
        component: './DataBase',
       
      },
      {
        name: '列表页',
        icon: <TabletFilled />,
        path: '/list',
        component: './Table',
       
      },
    ],
  },
};