/**
 * 宿禰：運動・生存系技能
 */
export const sukune = [
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

/**
 * 玉響
 */
export const tamayura = [
  "武術",
  "★奥義",
]

/**
 * 広目天
 */
export const koumokuten = [
  "観察眼",
  "危機察知",
  "★霊感",
]

/**
 * 豊聡耳
 */
export const toyosatomimi = [
  "聞き耳",
  "心理",
  "★霊感",
]

/**
 * 天狗蓑
 */
export const tengumino = [
  "隠匿",
]

/**
 * 八意
 */
export const yagokoro = [
  "検索",
  "電脳",
  "暗号",
]

/**
 * クリアリング
 */
export const clearing = [
  "＊調査",
  "＊知覚",
  "洞察",
  "直感",
  "観察眼",
]

/**
 * スニーキング
 */
export const sneaking = [
  "＊細工",
  "隠匿",
  "アクロバット",
  "危機察知",
]

/**
 * ストレングス
 */
export const strength = "ストレングス"

/**
 * 全角空白
 */
export const fullBlank = "　"

/**
 * イヤサカ装備チェックボックス テンプレート
 * @param name 装備ID
 * @param label 装備名
 * @param checked state
 * @param setMethod setState
 * @returns イヤサカ装備チェックボックス
 */
export const iyasakaEquipCheckbox = (name: string, label: string, checked: boolean, setMethod: (value: boolean) => void) => {
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

/**
 * クリップボードにテキストをコピー
 * @param text コピーするテキスト
 * @param onSuccess コピー成功時の動作
 */
export const copyTextToClipboard = (text: string, onSuccess: void) => {
  navigator.clipboard.writeText(text)
  .then(() => {
    onSuccess
  }, (error) => {
    alert('コピーに失敗しました。')
    console.error('Could not copy text: ', error)
  })
}

/**
 * 新約・コトリバコ用チャットパレット作成
 * @param inputChatPalette 加工前のチャットパレット
 * @param withSukune 宿禰 所持有無
 * @param withKoumokuten 広目天 所持有無
 * @param withToyosatomimi 豊聡耳 所持有無
 * @param withTengumino 天狗蓑 所持有無
 * @param withYagokoro 八意 所持有無
 * @param withYoichi 与一 所持有無
 * @param withRaiden 雷電 所持有無
 * @param withYaobiku 八百比丘 所持有無
 * @param clearingSkill クリアリング技能としても用いる技能
 * @param sneakingSkill スニーキング技能としても用いる技能
 * @param tamayuraSkill 玉響使用時に用いる技能
 * @returns 加工後のチャットパレット
 */
export const createOutputChatPalette = (
  inputChatPalette: string,
  withSukune: boolean,
  withKoumokuten: boolean,
  withToyosatomimi: boolean,
  withTengumino: boolean,
  withYagokoro: boolean,
  withYoichi: boolean,
  withRaiden: boolean,
  withYaobiku: boolean,
  clearingSkill: string,
  sneakingSkill: string,
  tamayuraSkill: string,
) => {
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
    outputCommands.push(`//${fullBlank}特殊技能`)
    specialSkillCommands.forEach(command => {
      outputCommands.push(command)
    })
    outputCommands.push(fullBlank)
  }

  // 出力用に取得技能を追加
  outputCommands.push(`//${fullBlank}取得技能`)
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
    outputCommands.push(`//${fullBlank}攻撃データ`)
    damageCommands.forEach(command => {
      outputCommands.push(command)
    })
    outputCommands.push(fullBlank)
  }

  // 出力用にベース技能を追加
  outputCommands.push(`//${fullBlank}ベース技能`)
  commandsBase.forEach(command => {
    outputCommands.push(command)
  })

  // 分解されたコマンドを一つのチャットパレットとして返す
  return outputCommands.join("\n")
}
