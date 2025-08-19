import { useEffect, useState } from 'react'

const PlayGame = ({ onChangeScore, onEndGame }) => {
  const [defaultData] = useState(
    "Indescribable oppression, which seemed to generate in some unfamiliar part of her consciousness, filled her whole being with a vague anguish. It was like a shadow, like a mist passing across her soul's summer day. It was strange and unfamiliar; it was a mood. She did not sit there inwardly upbraiding her husband, lamenting at Fate, which had directed her footsteps to the path which they had taken. She was just having a good cry all to herself. The mosquitoes made merry over her, biting her firm, round arms and nipping at her bare insteps"
  )
  const [dataTyping, setDataTyping] = useState([])
  const [textTyping, setTextTyping] = useState({ value: '', position: 0 })
  const [startTime, setStartTime] = useState(null)
  const [wordCount, setWordCount] = useState(0)
  const [timeElapsed, setTimeElapsed] = useState(0) // ⏱️ Track elapsed time

  useEffect(() => {
    const addWord = (quantityAdd = 20) => {
      const arrayDefaultData = defaultData.split(' ')
      const gamingText = []
      for (let index = 0; index < quantityAdd; index++) {
        const positionRandom = Math.floor(
          Math.random() * arrayDefaultData.length
        )
        gamingText.push({
          value: arrayDefaultData[positionRandom],
          status: null,
        })
      }
      setDataTyping(gamingText)
    }

    if (
      dataTyping.length === 0 ||
      textTyping.position > dataTyping.length - 1
    ) {
      addWord()
      setTextTyping({ ...textTyping, position: 0 })
      if (startTime === null) {
        setStartTime(Date.now())
      }
    }
  }, [textTyping.position])

  // Timer updater
  useEffect(() => {
    let interval
    if (startTime !== null) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [startTime])

  // End game after 60s
  useEffect(() => {
    let timer
    if (startTime !== null) {
      timer = setTimeout(() => {
        const elapsedTime = (Date.now() - startTime) / 60000 // time in minutes
        const finalWpm = Math.round(wordCount / elapsedTime)
        onEndGame(finalWpm)
      }, 60000)
    }
    return () => clearTimeout(timer)
  }, [startTime, wordCount, onEndGame])

  const handleChangeTyping = (e) => {
    const valueInput = e.target.value
    if (!valueInput.includes(' ')) {
      setTextTyping({ ...textTyping, value: valueInput })
    } else if (textTyping.value !== '') {
      checkResult()
    }
  }

  const checkResult = () => {
    const dataCheck = [...dataTyping] // 🔥 copy array to avoid mutation issues
    if (textTyping.value === dataCheck[textTyping.position].value) {
      dataCheck[textTyping.position].status = true
      onChangeScore('right')
      setWordCount(wordCount + 1)
    } else {
      dataCheck[textTyping.position].status = false
      onChangeScore('wrong')
    }
    setDataTyping(dataCheck)
    setTextTyping({ value: '', position: textTyping.position + 1 })
  }

  // Format time mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <div className="playing">
      <div className="timer">⏱️ Time: {formatTime(timeElapsed)}</div>
      <ul className="list">
        {dataTyping.map((word, index) => (
          <li
            key={index}
            className={
              word.status === true
                ? 'true'
                : word.status === false
                ? 'false'
                : ''
            }
          >
            {word.value}
          </li>
        ))}
      </ul>
      <div className="inputForm">
        <input
          type="text"
          autoFocus
          value={textTyping.value}
          onChange={handleChangeTyping}
        />
      </div>
    </div>
  )
}

export default PlayGame
