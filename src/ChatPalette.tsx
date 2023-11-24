import { useState } from 'react'
import { Tooltip } from "@mui/material";
import { RiDiscordFill } from 'react-icons/ri'
import { ImGithub } from 'react-icons/im'
import './App.css'

const ChatPalette = () => {
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
  const [showCopied, setShowCopied] = useState(false)

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

  // ストレングス
  const strength = "ストレングス"

  const placeHolderOfChatPalette = "{共鳴}DM<={強度} 〈∞共鳴〉\n({共鳴}+1)DM<={強度} 〈∞共鳴〉ルーツ属性一致\n({共鳴}*2)DM<={強度} 〈∞共鳴〉完全一致\n..."
  const fullBlank = "　"

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
    // 出力用
    const outputCommands: string[] = []

    // 入力されたチャットパレットを改行ごとに分解
    const inputCommands = inputChatPalette.split("\n")

    // ダイスボーナス付与処理
    const commands = inputCommands.map(command => {
      let changedCommand = command

      // 共鳴判定の{強度}を{呪力指数}に変換
      if (command.includes("{共鳴}")) {
        changedCommand = command.replace("<={強度} ", "<={呪力指数} ")
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

    // チャットパレットを共鳴判定、ベース技能、取得技能に分類
    const commandsResonance = commands.filter(command => command.includes("{共鳴}"))
    const commandsBase = commands.filter(command => command.includes("＊"))
    const commandsAcquired = commands.filter(
      // 取得技能＝共鳴判定でもベース技能でもないもの
      command => !commandsResonance.includes(command) && !commandsBase.includes(command)
    )

    // 出力用に共鳴判定を追加
    outputCommands.push("現在の呪力指数：{呪力指数}")
    commandsResonance.forEach(command => {
      outputCommands.push(command)
    })
    outputCommands.push(fullBlank)

    // 特殊技能
    const specialSkillCommands: string[] = []

    // クリアリングを追加
    const commandForClearing = commands.find(command => command.includes(clearingSkill))
    if (clearingSkill && commandForClearing) {
      specialSkillCommands.push(commandForClearing.replace(/〈.+?〉/, "〈クリアリング〉"))
    }
    
    // スニーキングを追加
    const commandForSneaking = commands.find(command => command.includes(sneakingSkill))
    if (sneakingSkill && commandForSneaking) {
      specialSkillCommands.push(commandForSneaking.replace(/〈.+?〉/, "〈スニーキング〉"))
    }

    // 出力用に特殊技能を追加
    if (specialSkillCommands.length > 0) {
      outputCommands.push("//　特殊技能")
      specialSkillCommands.forEach(command => {
        outputCommands.push(command)
      })
      outputCommands.push(fullBlank)
    }

    // 出力用に取得技能を追加
    outputCommands.push("//　取得技能")
    commandsAcquired.forEach(command => {
      outputCommands.push(command)
    })
    outputCommands.push(fullBlank)

    // ダメージ算出コマンド
    const damageCommands: string[] = []

    // 玉響を追加
    const commandForTamayura = commands.find(command => command.includes(tamayuraSkill))
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

      // ストレングスの技能レベルを取得
      const strengthLevel = Number(inputCommands.find(command => command.includes(strength))?.charAt(0) ?? 0)

      // 玉響ダメージを追加
      switch (tamayuraSkill) {
        case "武術":
          if (strengthLevel === 0) {
            damageCommands.push("XD3+2D6 玉響ダメージ ※Xは成功数")
          } else {
            damageCommands.push(`XD3+2D6+${strengthLevel} 玉響ダメージ ※Xは成功数`)
          }
          break
        case "★奥義":
          if (strengthLevel === 0) {
            damageCommands.push("(X+2)D6 玉響ダメージ ※Xは成功数")
          } else {
            damageCommands.push(`(X+2)D6+${strengthLevel} 玉響ダメージ ※Xは成功数`)
          }
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

    // 出力用にダメージ算出コマンドを追加
    if (damageCommands.length > 0) {
      outputCommands.push("//　攻撃データ")
      damageCommands.forEach(command => {
        outputCommands.push(command)
      })
      outputCommands.push(fullBlank)
    }

    // 出力用にベース技能を追加
    outputCommands.push("//　ベース技能")
    commandsBase.forEach(command => {
      outputCommands.push(command)
    })

    // 分解されたコマンドを一つのチャットパレットとしてセット
    setOutputChatPalette(outputCommands.join("\n"))
  }

  // クリップボードにテキストをコピー
  const copyTextToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    .then(() => {
      setShowCopied(true)
    }, (err) => {
      alert('コピーに失敗しました。')
      console.error('Could not copy text: ', err)
    })
  }

  // すべてを無に帰す
  const resetInputs = () => {
    setInputChatPalette("")
    setOutputChatPalette("")
    setWithSukune(false)
    setWithYoichi(false)
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
        <div className="chat-palette">
          <div className="chat-palette-label">チャットパレットを下の入力欄にコピペしてください</div>
          <textarea
            name="input-chat-palette"
            cols={60}
            rows={10}
            value={inputChatPalette}
            onChange={(event) => setInputChatPalette(event.target.value)}
            placeholder={placeHolderOfChatPalette}
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
          <Tooltip
            arrow
            open={showCopied}
            onClose={() => setShowCopied(false)}
            disableHoverListener
            placement="top"
            title="コピーしました！"
          >
            <button onClick={() => copyTextToClipboard(outputChatPalette)}>
              出力結果をコピー
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
        <a href="https://talto.cc/projects/uHgxrL9QQ9B3Fep7-1DAO">エモクロアTRPG『新約・コトリバコ』</a>用 チャパレ加工ツール
      </p>
      <p className="another-page">
        <a href="/kotoribako-chatpalette/ccfolia-format">ココフォリア駒加工ツールへ</a>
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

export default ChatPalette
