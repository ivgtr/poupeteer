import fs from 'fs'
import path from 'path'
import { Status as Tweet } from 'twitter-d'
import { getAllTweetData, getNewTweetData } from './utils/getTweetData'
import { createModel } from './utils/createModel'

const dir = process.cwd()

const checkProcess = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } else {
    return []
  }
}

const createTweetData = (filePath: string) => {
  const tweetData: Tweet[] = checkProcess(filePath)

  return tweetData.length ? getNewTweetData(tweetData) : getAllTweetData([])
}

export default (async () => {
  const filePath = path.join(dir, './poupeteer.json')

  const tweetDataResult = await createTweetData(filePath)

  fs.writeFile(filePath, JSON.stringify(tweetDataResult, null, 2), (err) => {
    if (err) console.log(err)
  })

  const modelDataResult = await createModel(tweetDataResult)

  fs.writeFileSync(path.join(dir, './db.json'), JSON.stringify(modelDataResult))
})()
