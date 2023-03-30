import axios, { AxiosInstance } from 'axios'
import { load } from 'cheerio'
import { decSnap } from '../utils'
import { SnapTikData } from '../types'

const request: AxiosInstance = axios.create({
    baseURL: 'https://snaptik.app/',
    headers: {
        'User-Agent':
            'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/111.0'
    }
})

export async function snapTik(url: string): Promise<SnapTikData> {
    const { data: getToken } = await request.get('/')
    const $ = load(getToken)
    const token = $('input[name="token"]').val()
    if (!token) {
        throw new Error('Cannot find token!')
    }
    const tokenValue = Array.isArray(token) ? token[0] : token

    const { data } = await request.post('/abc2.php', new URLSearchParams({
        url,
        token: tokenValue
    }))
    if (!data) {
        throw new Error('Data is null or undefined')
    }

    const script = /\}eval\(function/.exec(data)
    if (!script) {
        throw new Error('Could not execute script!')
    }

    const regex = /escape\(r\)\)\}\((.*?)\)/g
    const matches = regex.exec(data)
    if (!matches) {
        throw new Error('Could not execute script!')
    }

    const checkScript = matches[1].split(',').map((v) => (v.includes('"') ? v.slice(1, -1) : +v))
    const [h, u, n, t, e, r] = checkScript
    const result = decSnap(h.toString(), [u.toString()], n.toString(), t, e, r.toString()) as string

    const html = /innerHTML = "(.*?)";/.exec(result)
    if (!html) {
        throw new Error('Could not extract HTML!')
    }

    const removeChar = html[1].replace(/["\\]|&quot;/g, '')
    const $2 = load(removeChar)
    const title = $2('div.user-fullname').text().trim()
    const author = $2('div.user-username').text().trim()
    const download = $2('div.down-right > a').attr('href') || ''

    return { title, author, download }
}
