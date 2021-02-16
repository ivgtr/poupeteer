import React, { useState, useEffect } from 'react'

const View = () => {
  const [DB, setDB] = useState<{
    [key: string]: string[]
  }>({})
  const [view, setView] = useState<string>('')
  const [num, setNum] = useState<number>(2000)

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/ivgtr/poupeteer/master/packages/server/db.json')
      .then((response) => response.json())
      .then((data) => setDB(data))
  }, [])

  const makeSentence = (text: string) => {
    let now_word = ''
    let morphemes = ''
    now_word = DB['_BOS_'][Math.floor(Math.random() * DB['_BOS_'].length)]
    morphemes += now_word
    while (now_word != '_EOS_') {
      now_word = DB[now_word][Math.floor(Math.random() * DB[now_word].length)]
      morphemes += now_word
    }
    morphemes = text + morphemes.replace(/_EOS_$/, '。\n\n')
    if (morphemes.length > num) {
      setView(morphemes)
    } else {
      makeSentence(morphemes)
    }
  }

  return (
    <>
      <div className="w-full">
        <textarea
          className="block w-4/6 h-72 mx-auto p-1 border "
          placeholder="ボタンを押して生成してね"
          readOnly
          value={view}
        />
      </div>
      <p className="w-4/6 text-right mx-auto p-1">{view.length}</p>
      <p>
        <input type="number" defaultValue={num} onChange={(e) => setNum(Number(e.target.value))} />
        文字以上で作成
      </p>
      <button onClick={() => makeSentence('')}>データを作るよ！</button>
    </>
  )
}

export default View
