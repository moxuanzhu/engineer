import Vue from 'vue'
import Router from 'vue-router'
//登陆组件
import Login from '@/components/login/Login'
//404页面
import NotFound from '@/components/notfound/nofound'
//主页
import Main from '@/components/indexmap/main'

//地图页
import SuperMap from '@/components/indexmap/indexmap'
//地图页
import Details from '@/components/indexmap/detailsPage/index'
//日志
import Log from '@/components/log/index'
//操作日志
import OperateLog  from '@/components/log/logPage/operateLog'
//地图
import Map from '@/components/login/map'

// 商务合同(可编辑)
import Editcontract from '@/components/contract/editcontract'
// 商务合同(仅展示)
import Contract from '@/components/contract/contracts'
// 新增商务合同
import Addcontract from '@/components/contract/addcontracts'
//工程管理
import engineerManage from '@/components/engineerManage/index'

Vue.use(Router)
export default new Router({
  // mode:'history',
  routes: [
    //重定向登录页面
    {
      path: '/',
      redirect: '/login'
    },
    //404页面
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/map',
      name: 'Map',
      component: Map,
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/main',
          redirect: '/main/supermap'
        },
        {
          path: 'supermap',
          name: 'SuperMap',
          component: SuperMap
        },
        {
          path: '/main/contract',
          name: 'contract',
          component: Editcontract,
        },
        {
          path: '/main/contracts',
          name: 'contracts',
          component: Contract,
        },
        {
          path: '/main/contractd',
          name: 'contractd',
          component: Addcontract,
        },
        {
          path: '/main/engineerManage',
          name: 'engineerManage',
          component: engineerManage,
        },
        {
          path: 'log',
          name: 'log',
          component: Log,
          children: [
            {
              path: '/main/log',
              redirect: '/main/log/OperateLog'
            },
            {
              path: 'OperateLog',
              name: 'OperateLog',
              component: OperateLog
            },
          ]},
        {
          path: 'details',
          name: 'details',
          component: Details
        },
      ]},
  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})
