import { useState } from 'react'
import { Tooltip } from "@mui/material"
import { RiDiscordFill } from 'react-icons/ri'
import { ImGithub } from 'react-icons/im'
import './App.css'
import { CharacterClipboardData } from './ccfolia'
import { Link } from 'react-router-dom'
import {
  clearing,
  copyTextToClipboard,
  createOutputChatPalette,
  iyasakaEquipCheckbox,
  sneaking,
  tamayura,
} from './common'

const CcfoliaFormat = () => {
  const [inputTextArea, setInputTextArea] = useState("")
  const [inputCharJson, setInputCharJson] = useState("")
  const [withSukune, setWithSukune] = useState(false)
  const [numYoichi, setNumYoichi] = useState(0)
  const [withRaiden, setWithRaiden] = useState(false)
  const [withKoumokuten, setWithKoumokuten] = useState(false)
  const [withToyosatomimi, setWithToyosatomimi] = useState(false)
  const [withTengumino, setWithTengumino] = useState(false)
  const [withYagokoro, setWithYagokoro] = useState(false)
  const [withYaobiku, setWithYaobiku] = useState(false)
  const [clearingSkill, setClearingSkill] = useState("")
  const [sneakingSkill, setSneakingSkill] = useState("")
  const [tamayuraSkill, setTamayuraSkill] = useState("")
  const [showCopied, setShowCopied] = useState(false)

  // 与一の取得個数
  const yoichi = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
  ]

  // 型不正エラー文
  const invalidCharError = "貼り付けられたココフォリア駒が不正です。"

  // ココフォリア駒作成
  const createOutputCharJson = () => {
    if (!inputCharJson) return
    // 出力結果を格納する変数
    const charJson: CharacterClipboardData = JSON.parse(inputCharJson)

    try {
      // イニシアチブ＝【身体】+〈スピード〉
      const shintai = Number(charJson.data.params?.find(param => param.label === "身体")?.value ?? 0)
      const speed = Number(charJson.data.commands?.split("\n").find(command => command.includes("スピード"))?.charAt(0) ?? 0)
      charJson.data.initiative = shintai + speed
      // 宿禰を所持している場合はイニシアチブ+2
      if (withSukune) charJson.data.initiative += 2

      charJson.data.status?.forEach(item => {
        // 宿禰を所持している場合はHP+5
        if (withSukune && item.label === "HP") {
          item.value += 5
          item.max += 5
        }
        // 与一の取得個数×2だけMPを減少させる
        if (item.label === "MP") {
          item.value -= numYoichi * 2
          item.max -= numYoichi * 2
        }
      })

      // チャットパレット作成
      charJson.data.commands = createOutputChatPalette(
        charJson.data.commands ?? "",
        withSukune,
        withKoumokuten,
        withToyosatomimi,
        withTengumino,
        withYagokoro,
        numYoichi > 0,
        withRaiden,
        withYaobiku,
        clearingSkill,
        sneakingSkill,
        tamayuraSkill,
      )

      // 完成したココフォリア駒をクリップボードにコピー
      copyTextToClipboard(JSON.stringify(charJson), setShowCopied(true))
    } catch (error) {
      alert('ココフォリア駒の加工に失敗しました。')
      console.error('Could not create output: ', error)
    }
  }

  // JSON文字列を型チェックして変数にセット
  const checkInputCharJson = (value: string) => {
    try {
      const character: CharacterClipboardData = JSON.parse(value)

      // 入力されたオブジェクトの型チェック
      if (!isCharacterClipboardData(character)) {
        alert(invalidCharError)
        console.error('入力されたオブジェクトの型チェックエラーです。')
        return
      }

      setInputCharJson(value)
    } catch (error) {
      alert(invalidCharError)
      console.error('Could not convert JSON string: ', error)
    }
  }

  // オブジェクトの型チェック
  const isCharacterClipboardData = (obj: CharacterClipboardData) => {
    // とりあえずkindだけチェックする
    return obj.kind === "character"
  }

  // すべてを無に帰す
  const resetInputs = () => {
    setInputCharJson("")
    setWithSukune(false)
    setNumYoichi(0)
    setWithRaiden(false)
    setWithKoumokuten(false)
    setWithToyosatomimi(false)
    setWithTengumino(false)
    setWithYagokoro(false)
    setWithYaobiku(false)
    setClearingSkill("")
    setSneakingSkill("")
    setTamayuraSkill("")
  }

  return (
    <div className="App">
      <div className="card">
        <div className="char-json">
          <div className="char-json-label">{'"CCFOLIA形式でコピー"したものを以下のエリアに貼り付けてください'}</div>
          <textarea
            name="input-char-json"
            cols={60}
            value={inputTextArea}
            onChange={() => setInputTextArea("")}
            onPaste={(event) => checkInputCharJson(event.clipboardData.getData("text"))}
            placeholder={inputCharJson ? "ココフォリア駒 読み込み済" : "ここにココフォリア駒を貼り付けてください"}
          />
        </div>
        <div className="clearing">
          <label htmlFor="clearing-skill">クリアリング技能</label>
          <select
            id="clearing-skill"
            name="clearing-skill"
            value={clearingSkill}
            onChange={(event) => setClearingSkill(event.target.value)}
          >
            <option value="" />
            {clearing.map(skill => {
              return (
                <option key={skill} value={skill}>{skill}</option>
              )
            })}
          </select>
        </div>
        <div className="sneaking">
          <label htmlFor="sneaking-skill">スニーキング技能</label>
          <select
            id="sneaking-skill"
            name="sneaking-skill"
            value={sneakingSkill}
            onChange={(event) => setSneakingSkill(event.target.value)}
          >
            <option value="" />
            {sneaking.map(skill => {
              return (
                <option key={skill} value={skill}>{skill}</option>
              )
            })}
          </select>
        </div>
        <div className="tamayura">
          <label htmlFor="tamayura-skill">玉響で使う技能</label>
          <select
            id="tamayura-skill"
            name="tamayura-skill"
            value={tamayuraSkill}
            onChange={(event) => setTamayuraSkill(event.target.value)}
          >
            <option value="">玉響未所持</option>
            {tamayura.map(skill => {
              return (
                <option key={skill} value={skill}>{skill}</option>
              )
            })}
          </select>
        </div>
        <div className="yoichi">
          <label htmlFor="yoichi-num">与一の取得個数</label>
          <select
            id="yoichi-num"
            name="yoichi-num"
            value={numYoichi}
            onChange={(event) => setNumYoichi(Number(event.target.value))}
          >
            {yoichi.map(num => {
              return (
                <option key={num} value={num}>{num}</option>
              )
            })}
          </select>
        </div>
        <div className="iyasaka-equipments-db">
          ダイスボーナス装備
          {iyasakaEquipCheckbox("sukune", "宿禰", withSukune, setWithSukune)}
          {iyasakaEquipCheckbox("koumokuten", "広目天", withKoumokuten, setWithKoumokuten)}
          {iyasakaEquipCheckbox("toyosatomimi", "豊聡耳", withToyosatomimi, setWithToyosatomimi)}
          {iyasakaEquipCheckbox("tengumino", "天狗蓑", withTengumino, setWithTengumino)}
          {iyasakaEquipCheckbox("yagokoro", "八意", withYagokoro, setWithYagokoro)}
        </div>
        <div className="iyasaka-equipments">
          その他の装備
          {iyasakaEquipCheckbox("raiden", "雷電", withRaiden, setWithRaiden)}
          {iyasakaEquipCheckbox("yaobiku", "八百比丘", withYaobiku, setWithYaobiku)}
        </div>
        <p>
          <Tooltip
            arrow
            open={showCopied}
            onClose={() => setShowCopied(false)}
            disableHoverListener
            placement="top"
            title="コピーしました！"
          >
            <button onClick={() => createOutputCharJson()} disabled={!inputCharJson}>
              加工されたココフォリア駒をコピー
            </button>
          </Tooltip>
        </p>
        <p>
          <button onClick={() => resetInputs()}>
            リセット
          </button>
        </p>
      </div>
      <p className="read-the-docs">
        <a href="https://talto.cc/projects/uHgxrL9QQ9B3Fep7-1DAO">エモクロアTRPG『新約・コトリバコ』</a>用 ココフォリア駒加工ツール
      </p>
      <p className="another-page">
        <Link to="/kotoribako-chatpalette">チャパレ加工ツールへ</Link>
      </p>
      <div className="icons">
        <a href="https://discord.gg/PJG2TZHXUK">
          <RiDiscordFill size="32px" />
        </a>
        <a href="https://github.com/denkiuo604/kotoribako-chatpalette">
          <ImGithub size="32px" />
        </a>
      </div>
    </div>
  )
}

export default CcfoliaFormat
