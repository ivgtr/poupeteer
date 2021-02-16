import React from 'react'
import View from '../components/View'

const Home = () => {
  return (
    <>
      <h1 className="text-center mt-12 mx-2 text-xl font-bold">
        えんとつ町のプペルの紹介記事をマルコフ連鎖で書いて19円貰っちゃうサイト
      </h1>
      <p className="text-center mb-12 mx-2">
        <a href="/pupe.png" target="_brank" className="border-b border-blue-500 text-blue-500">
          参考
        </a>
      </p>
      <div className="container mx-auto">
        <View />
      </div>
      <p className="text-center my-12 mx-2">
        生成して投稿したら
        <a
          href="https://crowdworks.jp/public/jobs/6079013"
          target="_brank"
          className="border-b border-blue-500 text-blue-500"
        >
          ここ
        </a>
        に19円を貰いに行こう！
      </p>
    </>
  )
}

export default Home
