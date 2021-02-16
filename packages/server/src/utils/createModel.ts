import { Status as Tweet } from 'twitter-d'

const TinySegmenter = require('tiny-segmenter') // eslint-disable-line @typescript-eslint/no-var-requires

export const createModel = async (result: Tweet[]) => {
  const db: {
    [key: string]: string[]
  } = {}
  const tinySegmenter = new TinySegmenter()

  const tweetData = result.reduce<string[][]>((acc, value) => {
    const text = value.text
      .replace(/@([A-Za-z0-9_]+)\s+/g, '')
      .replace(/\r?\n/g, '')
      .split('。')
      .join('')
    if (text.match(/https?:\/\/[-_.!~*'()a-zA-Z0-9;/?:@&=+$,%#]+/)) {
      return acc
    }
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
