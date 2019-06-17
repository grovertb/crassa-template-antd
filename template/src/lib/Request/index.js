import axios from 'axios'

let _source, beforeRoute

function serialize(obj) {
  var str = []
  for (var p in obj) if(obj.hasOwnProperty(p)) str.push(encodeURIComponent(p) + '=' + obj[p])

  return str.join('&')
}

function verifyRequestCancel(route) {
  if(beforeRoute === route) {
    if(_source !== undefined) _source.cancel('Operation canceled due to new request.')
  } else {
    beforeRoute = route
  }
}

require('axios-debug-log')

export class Request {
  constructor(url) {
    this.url = url
    this.http()
  }

  http = function() {
    _source = axios.CancelToken.source()
    let url = typeof window === 'undefined' ? this.url : this.url || window.location.origin

    let instance = axios.create({
      baseURL    : `${url}/api/${process.env.REACT_APP_API_VERSION}/`,
      cancelToken: _source.token,
      mode       : 'no-cors'
    // withCredentials: true
    })

    if(this.token || (typeof window !== 'undefined' && localStorage.getItem('auth_token')))
      instance.defaults.headers.common['Authorization'] = this.token ?
        `Bearer ${this.token}` :
        typeof window !== 'undefined' && localStorage.getItem('auth_token') !== 'undefined' ?
          `Bearer ${localStorage.getItem('auth_token')}` :
          ''

    this.request = instance
  }

  Put = (route, json = {}) => {
    return new Promise((resolve, reject) => {
      verifyRequestCancel(route)
      this.request
        .put(route, json)
        .then(res => resolve(res.data))
        .catch(e => {
          reject({ type: axios.isCancel(e) ? 'cancel' : 'err', ...e })
        })
    })
  }

  Delete = (route, json = {}) => {
    return new Promise((resolve, reject) => {
      verifyRequestCancel(route)
      this.request
        .delete(route, { data: json })
        .then(res => resolve(res.data))
        .catch(e => {
          reject({ type: axios.isCancel(e) ? 'cancel' : 'err', ...e })
        })
    })
  }

  Patch = (route, json = {}) => {
    return new Promise((resolve, reject) => {
      verifyRequestCancel(route)
      this.request
        .patch(route, json)
        .then(res => resolve(res.data))
        .catch(e => {
          reject({ type: axios.isCancel(e) ? 'cancel' : 'err', ...e })
        })
    })
  }

  Post = (route, json = {}) => {
    return new Promise((resolve, reject) => {
      verifyRequestCancel(route)
      this.request
        .post(route, json)
        .then(res => resolve(res.data))
        .catch(e => {
          reject({ type: axios.isCancel(e) ? 'cancel' : 'err', ...e })
        })
    })
  }

  Get = (route, payload = {}) => {
    return new Promise((resolve, reject) => {
      verifyRequestCancel(route)
      this.request
        .get(route, {
          params: payload
        })
        .then(res => {
          resolve(res.data)
        })
        .catch(e => {
          reject({ type: axios.isCancel(e) ? 'cancel' : 'err', ...e })
        })
    })
  }

  GetList = (product, query) => {
    const concatString = product.indexOf('?') !== -1 ? '&' : '/?'

    return this.Get(product + concatString + serialize(query))
  }

  setHeaders = query => {
    if(query && 'headers' in query) for (let header in query.headers) this.request.defaults.headers.common[header] = query.headers[header]
  }

  reHydrateToken = token => {
    this.token = token
    this.http()
  }

  reHydrateUrl = url => {
    this.url = url
    this.http()
  }
}
