import { useState } from 'react'
import { Tooltip } from '@mui/material'
import { Modal } from '@mui/material'
import { Box } from '@mui/material'
import './App.css'
import { CharacterClipboardData } from './ccfolia'
import {
  clearing,
  copyTextToClipboard,
  createOutputChatPalette,
  iyasakaEquipCheckbox,
  sneaking,
  tamayura,
} from './common'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

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
  const [showCharDataModal, setShowCharDataModal] = useState(false)
  const [HP, setHP] = useState(0)
  const [MP, setMP] = useState(0)
  const [initiative, setInitiative] = useState(0)
  const [outputChatPalette, setOutputChatPalette] = useState("")

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
    if (!inputCharJson) return ""
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
        false,
        false,
        false,
        clearingSkill,
        sneakingSkill,
        tamayuraSkill,
        "",
      )

      // 画面上での確認用変数に値をセットする
      setHP(charJson.data.status?.find(item => item.label === "HP")?.value ?? 0)
      setMP(charJson.data.status?.find(item => item.label === "MP")?.value ?? 0)
      setInitiative(charJson.data.initiative)
      setOutputChatPalette(charJson.data.commands)

      // ココフォリア駒をJSON文字列で返す
      return JSON.stringify(charJson)
    } catch (error) {
      alert('ココフォリア駒の加工に失敗しました。')
      console.error('Could not create output: ', error)
      return ""
    }
  }

  // ココフォリア駒を作成してクリップボードにコピー
  const copyOutputCharJsonToClipboard = () => {
    copyTextToClipboard(createOutputCharJson(), setShowCopied(true))
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
      <Helmet>
        <title>エモクロアTRPG『新約・コトリバコ』用 ココフォリア駒加工ツール</title>
      </Helmet>
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
            <button onClick={() => copyOutputCharJsonToClipboard()} disabled={!inputCharJson}>
              加工されたココフォリア駒をコピー
            </button>
          </Tooltip>
        </p>
        <p>
          <Modal
            open={showCharDataModal}
            onClose={() => setShowCharDataModal(false)}
          >
            <Box className="box">
              <ul>
                <li>HP: {HP}</li>
                <li>MP: {MP}</li>
                <li>イニシアティブ: {initiative}</li>
              </ul>
              <textarea
                name="output-chat-palette"
                cols={60}
                rows={10}
                value={outputChatPalette}
                placeholder="ここに結果が出力されます"
                readOnly
              />
            </Box>
          </Modal>
          <button onClick={() => {
            createOutputCharJson()
            setShowCharDataModal(true)
          }} disabled={!inputCharJson}>
            ステータスとチャットパレットを確認
          </button>
        </p>
        <p>
          <button onClick={() => resetInputs()}>
            リセット
          </button>
        </p>
      </div>
      <Footer
        toolName="ココフォリア駒加工ツール"
        linkPath=""
        linkText="チャパレ加工ツールへ"
      />
    </div>
  )
}

export default CcfoliaFormat
