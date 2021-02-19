import type { Status as Tweet } from '../@types/twitter'

const TinySegmenter = require('tiny-segmenter') // eslint-disable-line @typescript-eslint/no-var-requires

export const createModel = async (result: Tweet[]) => {
  const db: {
    [key: string]: string[]
  } = {}
  const tinySegmenter = new TinySegmenter()

  const tweetData = result.reduce<string[][]>((acc, value) => {
    const text = value.text
      .replace(/@([A-Za-z0-9_]+)\s+/g, '')
      .replace(/[#＃][Ａ-Ｚａ-ｚA-Za-z一-鿆0-9０-９ぁ-ヶｦ-ﾟー._-]+/g, '')
      .replace(/https?:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+/g, '')
      .replace(/\r?\n/g, '')
      .trim()
      .replace(/\s+/g, '')
      .split('。')
      .join('')
    if (text.length < 10) return acc
    const segments: string[] = tinySegmenter.segment(text)
    acc.push(segments)
    return acc
  }, [])

  tweetData.map((tweet) => {
    ;['_BOS_', ...tweet, '_EOS_'].sort((a: string, b: string) => {
      db[b] ? (db[b] = db[b].concat([a])) : (db[b] = [a])
      return 1
    })
  })

  return db
}
