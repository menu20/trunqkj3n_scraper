import { request, check_vaild_image_url } from '../utils'

import { MeituSchema } from '../types'
export async function meitu(url: string): Promise<MeituSchema> {
    if (!check_vaild_image_url(url)) return { base64: undefined }
    try {
        const data = await request([{
            url: 'https://thieutrungkien.dev/draw?url=' + encodeURI(url),
            method: 'GET',
            responseType: 'arraybuffer'
        }])
        const base64 = Buffer.from(data, 'binary').toString('base64')
        return {
            base64
        }
    } catch (err) {
        return { base64: undefined }
    }
}
