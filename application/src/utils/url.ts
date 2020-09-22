export function queryUrlSearchParams(key: string) {
  const qs = new URLSearchParams(window.location.search)
  return qs.get(key)
}
export const convertObjToUrlPamras = (data) => {
  var keys = Object.keys(data)
  keys = keys.sort()
  var newArgs = {}
  keys.forEach(function (key) {
    newArgs[key] = data[key]
  })
  var string = ''
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k]
  }
  string = string.substr(1)
  return string
}
export const encodeURLParams = (obj: Object) => {
  const params = []
  Object.keys(obj).forEach((key) => {
    let value = obj[key]
    if (typeof value === 'undefined') {
      value = ''
    }
    params.push([key, encodeURIComponent(value)].join('='))
  })
  return params.join('&')
}
