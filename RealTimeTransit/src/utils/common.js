// 获取路径上的参数
export function urlQueryString (name) {
  var rex = new RegExp('[?&]s*' + name + 's*=([^&$#]*)', 'i')
  var r = rex.exec(location.search)
  if (r && r.length === 2) {
    return decodeURIComponent(r[1])
  }
}
// // 从路径上获取并设置title
// export function setTittle (name, str) {
//   let queryName =
//     this.$route.query.name || urlQueryString(name)
//   if (queryName) {
//     window.yl.call(
//       'setTitleBarText', {
//         title: queryName + str
//       }, {
//         onSuccess: function (a) {
//           alert('success')
//         },
//         onFail: function (a) {
//           alert('fail')
//         }
//       }
//     )
//   }
// }
