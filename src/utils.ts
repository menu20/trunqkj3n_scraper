import axios, { AxiosRequestConfig } from 'axios'

export const youtube_parser = async (url: string): Promise<string | boolean> => {
  const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  const match = url.match(regExp)
  return match && match[7].length == 11 ? match[7] : false
}
export const facebook_get_vanity = async (url: string): Promise<string | boolean> => {
  const match = url.match(/facebook\.com\/([A-Za-z0-9.]+)/)
  return match ? match[1] : url
}
export const check_vaild_image_url = async (url: string): Promise<boolean> =>
  !!/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*\.(jpg|png|jpeg)$/i.test(url)

export const request = async ([{ url, method, responseType, data, headers }]: [AxiosRequestConfig]): Promise<any> => {
  const error = !url ? 'URL is empty' : !method ? 'Method is empty' : undefined
  if (error) throw new Error(error)
  const { data: res } = await axios({
    url,
    method,
    responseType,
    data,
    headers
  })
  return res
}

export const decSnap = (h: any, u: string[], n: string, t: any, e: any, r: string) => {
  function chip (d: string, e: number, f: number): string {
    const g: string[] =
            '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ+/'.split(
            	''
            )
    const h: string[] = g.slice(0, e)
    const i: string[] = g.slice(0, f)
    let j: number = d
      .split('')
      .reverse()
      .reduce(function (a: number, b: string, c: number) {
        if (h.indexOf(b) !== -1) return (a += h.indexOf(b) * Math.pow(e, c))
        return a
      }, 0)
    let k = ''
    while (j > 0) {
      k = i[j % f] + k
      j = Math.floor(j / f)
    }
    return k || '0'
  }
  r = ''
  for (let i = 0, len: number = h.length; i < len; i++) {
    let s = ''
    while (h[i] !== n[e]) {
      s += h[i]
      i++
    }
    for (let j = 0; j < n.length; j++) {
      s = s.replace(new RegExp(n[j], 'g'), j.toString())
    }
    r += String.fromCharCode(Number(chip(s, e, 10)) - t)
  }
  return decodeURIComponent(escape(r))
}
