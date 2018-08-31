const Index = r => require(['../views/index'], r)
const Search = r => require(['../views/search'], r)
const searchLine = r => require(['../views/searchLine'], r)
const searchLineDetails = r => require(['../views/searchLineDetails'], r)
const lineDetails = r => require(['../views/lineDetails'], r)
const lineLists = r => require(['../views/lineLists'], r)
const test = r => require(['../views/test'], r)

// 页面路由
const routes = [{
  path: '',
  redirect: {
    name: 'index'
  }
}, {
  path: '/',
  component: Index,
  name: 'index',
  meta: {
    title: '定制公交'
  }
}, {
  path: '/search',
  component: Search,
  name: 'search',
  meta: {
    title: '查询'
  }
}, {
  path: '/searchLine',
  component: searchLine,
  name: 'searchLine',
  meta: {
    title: '附近站点'
  }
}, {
  path: '/searchLineDetails',
  component: searchLineDetails,
  name: 'searchLineDetails'
}, {
  path: '/lineDetails',
  component: lineDetails,
  name: 'lineDetails'
}, {
  path: '/lineLists',
  component: lineLists,
  name: 'lineLists'
},
{
  path: '/test',
  component: test,
  name: 'test',
  meta: {
    title: 'test'
  }
}]

// 404 页
// routes.push({
//   path: '*',
//   component: error,
//   name: 'error',
//   meta: {
//     title: '众城通'
//   }
// })

export default routes
