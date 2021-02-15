import fs from 'fs'
import path from 'path'
import { Status as Tweet } from 'twitter-d'
import { getAllTweetData, getNewTweetData } from './utils/getTweetData'

const dir = process.cwd()

const checkProcess = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } else {
    return []
  }
}

export default (async () => {
  const filePath = path.join(dir, 'src/configs/poupeteer.json')

  const tweetData = checkProcess(filePath)

  let result: Tweet[]

  if (tweetData.length) {
    result = await getNewTweetData(tweetData)
  } else {
    result = await getAllTweetData([])
  }

  fs.writeFileSync(filePath, JSON.stringify(result, null, 2))
})()
