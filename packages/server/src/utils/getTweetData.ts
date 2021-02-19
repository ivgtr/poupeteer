import * as dotenv from 'dotenv'
import Twitter from 'twitter'

import type { Status as Tweet } from '../@types/twitter'

dotenv.config()

const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  bearer_token: process.env.TWITTER_BEARER_TOKEN as string
})

type Params = {
  q: string
  count: string
  result_type: string
  trim_user: boolean
  include_entities: boolean
}

const params: Params = {
  q: '#えんとつ町のプぺル exclude:retweets',
  count: '100',
  result_type: 'recent',
  trim_user: true,
  include_entities: false
}

type Params_ex = {
  max_id?: string
  since_id?: string
}

type SearchResult = {
  statuses: Tweet[]
  search_metadata: { next_results: string }
}

const getTweetData = async (params: Params & Params_ex) => {
  const result: SearchResult = await new Promise((resolve, reject) => {
    client.get('search/tweets', params, (err, result) => {
      if (err) reject(err)
      resolve(result as SearchResult)
    })
  })

  return result.statuses
}

export const getNewTweetData = async (tweetData: Tweet[]): Promise<Tweet[]> => {
  const result = await getTweetData({ ...params, since_id: tweetData[0].id_str })
  if (result.length) {
    return getNewTweetData(result.concat(tweetData))
  }
  return tweetData
}
export const getAllTweetData = async (tweetData: Tweet[]): Promise<Tweet[]> => {
  const _params: Params & Params_ex = {
    ...params
  }
  if (tweetData.length) _params.max_id = tweetData.slice(-1)[0].id_str

  const result = await getTweetData(_params).catch<[]>(() => [])

  if (result.length) {
    return getAllTweetData(tweetData.length ? tweetData.concat(result) : result)
  }
  return tweetData
}
