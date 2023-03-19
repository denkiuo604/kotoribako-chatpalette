import { useState } from 'react'
import './App.css'

function App() {
  const [inputChatPalette, setInputChatPalette] = useState("")
  const [outputChatPalette, setOutputChatPalette] = useState("")
  const [withSukune, setWithSukune] = useState(false)
  const [withYoichi, setWithYoichi] = useState(false)
  const [withRaiden, setWithRaiden] = useState(false)
  const [withKoumokuten, setWithKoumokuten] = useState(false)
  const [withToyosatomimi, setWithToyosatomimi] = useState(false)
  const [withTengumino, setWithTengumino] = useState(false)
  const [withYagokoro, setWithYagokoro] = useState(false)
  const [withYaobiku, setWithYaobiku] = useState(false)
  const [clearingSkill, setClearingSkill] = useState("")
  const [sneakingSkill, setSneakingSkill] = useState("")
  const [tamayuraSkill, setTamayuraSkill] = useState("")

  // 宿禰：運動・生存系技能
  const sukune = [
    "＊運動",
    "スピード",
    "ストレングス",
    "アクロバット",
    "ダイブ",
    "＊格闘",
    "武術",
    "★奥義",
    "＊投擲",
    "★射撃",
    "＊生存",
    "耐久",
    "＊自我",
    "根性",
    "＊手当て",
    "医術",
    "★蘇生",
  ]

  // 玉響
  const tamayura = [
    "武術",
    "★奥義",
  ]

  // 広目天
  const koumokuten = [
    "観察眼",
    "危機察知",
    "★霊感",
  ]

  // 豊聡耳
  const toyosatomimi = [
    "聞き耳",
    "心理",
    "★霊感",
  ]

  // 天狗蓑
  const tengumino = [
    "隠匿",
  ]

  // 八意
  const yagokoro = [
    "検索",
    "電脳",
    "暗号",
  ]

  // クリアリング
  const clearing = [
    "＊調査",
    "＊知覚",
    "洞察",
    "直感",
    "観察眼",
  ]

  // スニーキング
  const sneaking = [
    "＊細工",
    "隠匿",
    "アクロバット",
    "危機察知",
  ]

  const placeHolderOfChatPalette = "{共鳴}DM<= 〈∞共鳴〉\n({共鳴}+1)DM<= 共鳴判定（ルーツ属性一致）\n({共鳴}*2)DM<= 共鳴判定（完全一致）\n..."
  const borderLine = "--------------------"

  // イヤサカ装備チェックボックス テンプレート
  const iyasakaEquipCheckbox = (name: string, label: string, checked: boolean, setMethod: (value: boolean) => void) => {
    return (
      <div className="iyasaka-equipment">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={(event) => setMethod(event.target.checked)}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    )
  }

  // チャットパレット作成
  const createOutputChatPalette = (inputChatPalette: string) => {
    // 入力されたチャットパレットを改行ごとに分解
    const commands = inputChatPalette.split("\n")

    const changedCommands = commands.map(command => {
      let changedCommand = command

      // 共鳴判定に{呪力指数}を追加
      if (command.includes("{共鳴}")) {
        changedCommand = command.replace("<= ", "<={呪力指数} ")
      }

      // 宿禰ダイスボーナスを追加
      if (withSukune && sukune.some(skill => command.includes(skill))) {
        changedCommand = command.replace(/(\d)DM/, "($1+1)DM") + "※宿禰"
      }

      // 広目天ダイスボーナスを追加
      if (withKoumokuten && koumokuten.some(skill => command.includes(skill))) {
        changedCommand = command.replace(/(\d)DM/, "($1+1)DM") + "※広目天"
      }

      // 豊聡耳ダイスボーナスを追加
      if (withToyosatomimi && toyosatomimi.some(skill => command.includes(skill))) {
        changedCommand = command.replace(/(\d)DM/, "($1+1)DM") + "※豊聡耳"
      }

      // 天狗蓑ダイスボーナスを追加
      if (withTengumino && tengumino.some(skill => command.includes(skill))) {
        changedCommand = command.replace(/(\d)DM/, "($1+2)DM") + "※天狗蓑"
      }

      // 八意ダイスボーナスを追加
      if (withYagokoro && yagokoro.some(skill => command.includes(skill))) {
        changedCommand = command.replace(/(\d)DM/, "($1+2)DM") + "※八意"
      }

      return changedCommand
    })

    // 特殊技能
    const specialSkillCommands: string[] = []

    // スニーキングを追加
    const commandForSneaking = changedCommands.find(command => command.includes(sneakingSkill))
    if (sneakingSkill && commandForSneaking) {
      specialSkillCommands.push(commandForSneaking.replace(/〈.+?〉/, "〈スニーキング〉"))
    }

    // クリアリングを追加
    const commandForClearing = changedCommands.find(command => command.includes(clearingSkill))
    if (clearingSkill && commandForClearing) {
      specialSkillCommands.push(commandForClearing.replace(/〈.+?〉/, "〈クリアリング〉"))
    }

    // 特殊技能を追加
    if (specialSkillCommands.length > 0) {
      specialSkillCommands.unshift(borderLine)
      specialSkillCommands.forEach(command => {
        changedCommands.unshift(command)
      })
    }

    // ダメージ算出コマンド
    const damageCommands: string[] = []

    // 玉響を追加
    const commandForTamayura = changedCommands.find(command => command.includes(tamayuraSkill))
    if (tamayuraSkill && commandForTamayura) {
      damageCommands.push("1D3 玉響MP消費")

      // 玉響MP消費時コマンドを追加
      const regExpDM = /(\d)DM/
      const regExpDMwithDB = /\(([0-9+]*)\)DM/
      if (regExpDM.test(commandForTamayura)) {
        damageCommands.push(commandForTamayura.replace(regExpDM, "($1+{共鳴})DM") + " ※玉響MP消費")
      } else if (regExpDMwithDB.test(commandForTamayura)) {
        damageCommands.push(commandForTamayura.replace(regExpDMwithDB, "($1+{共鳴})DM") + " ※玉響MP消費")
      }

      // 玉響ダメージを追加
      switch (tamayuraSkill) {
        case "武術":
          damageCommands.push("XD3+2D6 玉響ダメージ ※Xは成功数")
          break
        case "★奥義":
          damageCommands.push("(X+2)D6 玉響ダメージ ※Xは成功数")
          break
        default:
          break
      }
    }

    // 与一を追加
    if (withYoichi) {
      damageCommands.push("{共鳴}D10 与一ダメージ")
    }

    // 雷電を追加
    if (withRaiden) {
      damageCommands.push("X+1D6 雷電ダメージ ※Xは成功数")
    }

    // 八百比丘を追加
    if (withYaobiku) {
      damageCommands.push("2D6 八百比丘HP回復")
    }

    // ダメージ算出コマンドを追加
    if (damageCommands.length > 0) {
      changedCommands.push(borderLine)
      damageCommands.forEach(command => {
        changedCommands.push(command)
      })
    }

    // 分解されたコマンドを一つのチャットパレットとしてセット
    setOutputChatPalette(changedCommands.join("\n"))
  }

  // クリップボードにテキストをコピー
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    .then(function () {
      alert('クリップボードにコピーしました！')
    }, function (err) {
      alert('コピーに失敗しました。')
      console.error('Could not copy text: ', err)
    })
  }

  return (
    <div className="App">
      <div className="card">
        <div className="chat-palette">
          <div className="chat-palette-label">チャットパレット</div>
          <textarea
            name="input-chat-palette"
            cols={60}
            rows={10}
            value={inputChatPalette}
            onChange={(event) => setInputChatPalette(event.target.value)}
            placeholder={placeHolderOfChatPalette}
          />
        </div>
        <div className="iyasaka-equipments">
          ダイスボーナス装備
          {iyasakaEquipCheckbox("sukune", "宿禰", withSukune, setWithSukune)}
          {iyasakaEquipCheckbox("koumokuten", "広目天", withKoumokuten, setWithKoumokuten)}
          {iyasakaEquipCheckbox("toyosatomimi", "豊聡耳", withToyosatomimi, setWithToyosatomimi)}
          {iyasakaEquipCheckbox("tengumino", "天狗蓑", withTengumino, setWithTengumino)}
          {iyasakaEquipCheckbox("yagokoro", "八意", withYagokoro, setWithYagokoro)}
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
                <option value={skill}>{skill}</option>
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
                <option value={skill}>{skill}</option>
              )
            })}
          </select>
        </div>
        <div className="tamayura">
          <label htmlFor="tamayura-skill">玉響 使用技能</label>
          <select
            id="tamayura-skill"
            name="tamayura-skill"
            value={tamayuraSkill}
            onChange={(event) => setTamayuraSkill(event.target.value)}
          >
            <option value="" />
            {tamayura.map(skill => {
              return (
                <option value={skill}>{skill}</option>
              )
            })}
          </select>
        </div>
        <div className="iyasaka-equipments">
          その他の装備
          {iyasakaEquipCheckbox("yoichi", "与一", withYoichi, setWithYoichi)}
          {iyasakaEquipCheckbox("raiden", "雷電", withRaiden, setWithRaiden)}
          {iyasakaEquipCheckbox("yaobiku", "八百比丘", withYaobiku, setWithYaobiku)}
        </div>
        <p>
          <button onClick={() => createOutputChatPalette(inputChatPalette)}>
            出力
          </button>
        </p>
        <div className="chat-palette">
          <textarea
            name="output-chat-palette"
            cols={60}
            rows={10}
            value={outputChatPalette}
            placeholder="ここに結果が出力されます"
            readOnly
          />
        </div>
        <p>
          <button onClick={() => copyTextToClipboard(outputChatPalette)}>
            出力結果をコピー
          </button>
        </p>
      </div>
      <p className="read-the-docs">
        <a href="https://talto.cc/projects/uHgxrL9QQ9B3Fep7-1DAO" target="_blank">エモクロアTRPG『新約・コトリバコ』</a>用 チャパレ加工ツール
      </p>
    </div>
  )
}

export default App
