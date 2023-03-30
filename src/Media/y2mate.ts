import axios, { AxiosInstance } from 'axios'
import { load } from 'cheerio'
import { youtube_parser } from '../utils'
import { Y2mateResponse } from '../types'

const y2mateAxios: AxiosInstance = axios.create({
    baseURL: 'https://www.y2mate.com/mates/en68',
    headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9,vi;q=0.8',
        'content-type': 'multipart/form-data'
    }
})

export async function getY2mateResponse(url: string): Promise<Y2mateResponse> {
    const videoId = await youtube_parser(url)
    if (!videoId) {
        throw new Error('Invalid URL')
    }

    try {
        const { data } = await y2mateAxios.post('/analyze/ajax', {
            url: `https://youtu.be/${videoId}`,
            q_auto: 0,
            ajax: 2
        })

        const $ = load(data.result)
        const { src: imageSrc } = $('div.thumbnail.cover a > img')[0].attribs
        const title = $('div.caption.text-left > b').text()
        const size = $('#mp3 td:nth-child(2)').text()
        const { ftype: type, fquality: quality } = $('#mp3 td:nth-child(3) a')[0].attribs
        const id = data.result.match(/var k__id = "(.*?)"/)?.[1]

        const { data: data2 } = await y2mateAxios.post('/convert', {
            type: 'youtube',
            v_id: videoId,
            _id: id,
            ajax: '1',
            token: '',
            ftype: type,
            fquality: quality
        })

        const $2 = load(data2.result)
        const downloadLink = $2('div.form-group.has-success.has-feedback a')?.[0]?.attribs?.href

        return {
            imageSrc,
            title,
            size,
            type,
            quality,
            downloadLink
        }
    } catch (err) {
        console.error(err)
        throw new Error('Unable to get Y2mate response')
    }
}
