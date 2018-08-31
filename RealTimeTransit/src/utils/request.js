import axios from 'axios'
import * as CONFIG from './config'

// 返回请求
function httpResponse (res) {
  // console.log(res)
  let ret = ''
  switch (res.code || res.status) {
  case '0':
    ret = res.data
    break
  case '200':
    ret = res
    break
  case '20000':
    ret = res
    break
  case '40004':
    ret = res
    break
  default:
      //   location.href = 'error'
  }
  return ret
}

/**
 * http请求
 * @param  opts = {headers:{withCredentials: true},url : '/test', method: 'GET', queryString: '?a=12345', data}
 * @return {[res = res || false]}
 * */
export async function request (opts) {
  let response = {}
  let _opts = Object.assign({
    baseURL: CONFIG.baseURL,
    method: 'GET',
    queryString: '',
    timeout: 10000,
    headers: {
      // crossDomain: true,
      // withCredentials: true,
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }, opts)

  _opts.url = _opts.baseURL + _opts.url
  // console.log(_opts)

  let http = new Promise((resolve, reject) => {
    axios(_opts)
      .then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
  })

  await http.then(function (res) {
    // success
    if (res.status === 200) response = res.data
  }, function (err) {
    // failure
    console.log(err)
    response = {
      err: err.response.status,
      errMsg: err.response.data.message || '请检查网络是否正常',
      code: err.response.data.code
    }
  })
  return httpResponse(response)
}

export function ajax (url, sendData) {
  return new Promise(function (resolve, reject) {
    var data = {
      request: JSON.stringify(sendData)
    }
    var aData = []
    for (var attr in data) {
      aData.push(attr + '=' + data[attr])
    }
    var sData = aData.join('&')
    const handler = function () {
      if (this.readyState !== 4) {
        return
      }
      if (this.status === 200) {
        var res = JSON.parse(this.response)
        resolve(res)
      } else {
        reject(new Error('访问出错！'))
      }
    }
    const client = new XMLHttpRequest()
    client.open('POST', url)
    client.onreadystatechange = handler
    // client.setRequestHeader('Content-type', 'multipart/form-data')
    client.send(sData)
  })
}
