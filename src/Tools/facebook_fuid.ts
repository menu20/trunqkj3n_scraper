import { request, facebook_get_vanity } from '../utils'
import { facebook_UID_Schema } from '../types'

export async function facebook_fuid(url: string): Promise<facebook_UID_Schema> {
    if (!url) {
        throw new Error('URL is empty')
    }

    try {
        const vanity = await facebook_get_vanity(url) as string
        const data = await request([{
            url: `https://trungkien.dev/finduid?vanity=${vanity}`,
            method: 'GET'
        }])
        return {
            uid: data.entity_id,
            vanity: data.userVanity
        }
    } catch (e) {
        return {
            uid: undefined,
            vanity: undefined
        }
    }
}
