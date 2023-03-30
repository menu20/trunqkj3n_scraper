import { request, decSnap } from '../utils'
import { load } from 'cheerio'

import { SnapSaveSchema } from '../types'
export async function snapSave(url: string): Promise<SnapSaveSchema> {
    const data = await request([{
        url: 'https://snapsave.app/action.php?lang=en',
        method: 'POST',
        data: {
            url,
            lang: 'en'
        },
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }])
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
    const $ = load(removeChar)
    const media_content = $('div.media-content > .content > p')
    const author = $(media_content).find('strong').text()
    const title = $(media_content).find('span.video-des').text()
    const download = $('div.modal-content > video').attr('src') as string
    return {
        author,
        title,
        download
    }
}
