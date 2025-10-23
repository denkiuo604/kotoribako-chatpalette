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
 * ココフォリア駒 型不正エラー文
 */
export const invalidCharError = `貼り付けられたココフォリア駒が不正です。\nキャラクターシートから"CCFOLIA形式でコピー"してください。`

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
 * @param withMakako 麻迦古 所持有無
 * @param withHitokotonushi 一言主 所持有無
 * @param withAmanokaeshiya 天之返矢 所持有無
 * @param clearingSkill クリアリング技能としても用いる技能
 * @param sneakingSkill スニーキング技能としても用いる技能
 * @param tamayuraSkill 玉響使用時に用いる技能
 * @param magatsuSkill 禍津使用時に用いる技能
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
  withMakako: boolean,
  withHitokotonushi: boolean,
  withAmanokaeshiya: boolean,
  clearingSkill: string,
  sneakingSkill: string,
  tamayuraSkill: string,
  magatsuSkill: string,
) => {
  // 正規表現
  const regExpDM = /(\d)DM/
  const regExpDMwithDB = /\(([0-9+]*)\)DM/
  const regExpDA = /DA{(.*)}/
  const regExpDAwithDB = /DA{(.*)}\+\((.*)\)/

  // 出力用
  const outputCommands: string[] = []

  // 入力されたチャットパレットを改行ごとに分解
  const inputCommands = inputChatPalette.split("\n")

  // ダイスボーナス付与処理
  const commands = inputCommands.map(command => {
    let changedCommand = command

    // 共鳴判定の{強度}を{呪力指数}に変換
    if (command.includes("{共鳴}")) {
      changedCommand = changedCommand.replace("<={強度} ", "<={呪力指数} ")
    }

    // 宿禰ダイスボーナスを追加
    if (withSukune && sukune.some(skill => command.includes(skill))) {
      changedCommand = changedCommand.replace(regExpDA, "DA{$1}+(1)")
      changedCommand = changedCommand.replace(regExpDM, "($1+1)DM")
      changedCommand += "※宿禰"
    }

    // 広目天ダイスボーナスを追加
    if (withKoumokuten && koumokuten.some(skill => command.includes(skill))) {
      changedCommand = changedCommand.replace(regExpDM, "($1+1)DM")
      changedCommand = changedCommand.replace(regExpDA, "DA{$1}+(1)")
      changedCommand += "※広目天"
    }

    // 豊聡耳ダイスボーナスを追加
    if (withToyosatomimi && toyosatomimi.some(skill => command.includes(skill))) {
      if (withKoumokuten && command.includes("★霊感")) {
        // 霊感へのダイスボーナスが広目天と重複した場合
        changedCommand = changedCommand.replace(regExpDMwithDB, "($1+1)DM")
        changedCommand = changedCommand.replace(regExpDAwithDB, "DA{$1}+($2+1)")
        changedCommand += " ※豊聡耳"
      } else {
        changedCommand = changedCommand.replace(regExpDM, "($1+1)DM")
        changedCommand = changedCommand.replace(regExpDA, "DA{$1}+(1)")
        changedCommand += "※豊聡耳"
      }
    }

    // 天狗蓑ダイスボーナスを追加
    if (withTengumino && tengumino.some(skill => command.includes(skill))) {
      changedCommand = changedCommand.replace(regExpDM, "($1+2)DM")
      changedCommand = changedCommand.replace(regExpDA, "DA{$1}+(2)")
      changedCommand += "※天狗蓑"
    }

    // 八意ダイスボーナスを追加
    if (withYagokoro && yagokoro.some(skill => command.includes(skill))) {
      changedCommand = changedCommand.replace(regExpDM, "($1+2)DM")
      changedCommand = changedCommand.replace(regExpDA, "DA{$1}+(2)")
      changedCommand += "※八意"
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

  // 一言主を追加
  const commandForHitokotonushi = commands.find(command => command.includes("★霊感"))
  if (withHitokotonushi && commandForHitokotonushi) {
    // 一言主MP消費時コマンドを追加
    if (regExpDM.test(commandForHitokotonushi)) {
      specialSkillCommands.push(commandForHitokotonushi.replace(regExpDM, "($1+1)DM") + " ※一言主MP消費時")
    } else if (regExpDMwithDB.test(commandForHitokotonushi)) {
      specialSkillCommands.push(commandForHitokotonushi.replace(regExpDMwithDB, "($1+1)DM") + " ※一言主MP消費時")
    } else if (regExpDAwithDB.test(commandForHitokotonushi)) {
      specialSkillCommands.push(commandForHitokotonushi.replace(regExpDAwithDB, "DA{$1}+($2+1)") + " ※一言主MP消費時")
    } else if (regExpDA.test(commandForHitokotonushi)) {
      specialSkillCommands.push(commandForHitokotonushi.replace(regExpDA, "DA{$1}+(1)") + " ※一言主MP消費時")
    }
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

  // ストレングスの技能レベルを取得
  const strengthLevel = Number(inputCommands.find(command => command.includes(strength))?.charAt(0) ?? 0)

  // 玉響を追加
  const commandForTamayura = commands.find(command => command.includes(tamayuraSkill))
  if (tamayuraSkill && commandForTamayura) {
    damageCommands.push("1D3 玉響消費MP")

    // 玉響MP消費時コマンドを追加
    if (regExpDM.test(commandForTamayura)) {
      damageCommands.push(commandForTamayura.replace(regExpDM, "($1+{共鳴})DM") + " ※玉響MP消費時")
    } else if (regExpDMwithDB.test(commandForTamayura)) {
      damageCommands.push(commandForTamayura.replace(regExpDMwithDB, "($1+{共鳴})DM") + " ※玉響MP消費時")
    } else if (regExpDAwithDB.test(commandForTamayura)) {
      damageCommands.push(commandForTamayura.replace(regExpDAwithDB, "DA{$1}+($2+{共鳴})") + " ※玉響MP消費時")
    } else if (regExpDA.test(commandForTamayura)) {
      damageCommands.push(commandForTamayura.replace(regExpDA, "DA{$1}+({共鳴})") + " ※玉響MP消費時")
    }

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
    damageCommands.push("2D6 八百比丘回復HP")
  }

  // 麻迦古を追加
  const commandForMakako = commands.find(command => command.includes("★射撃"))
  if (withMakako && commandForMakako) {
    // 麻迦古用コマンドを追加
    if (regExpDM.test(commandForMakako)) {
      damageCommands.push(commandForMakako.replace(regExpDM, "($1+X)DM") + " ※麻迦古 ※Xは消費MP")
    } else if (regExpDMwithDB.test(commandForMakako)) {
      damageCommands.push(commandForMakako.replace(regExpDMwithDB, "($1+X)DM") + " ※麻迦古 ※Xは消費MP")
    } else if (regExpDAwithDB.test(commandForMakako)) {
      damageCommands.push(commandForMakako.replace(regExpDAwithDB, "DA{$1}+($2+X)") + " ※麻迦古 ※Xは消費MP")
    } else if (regExpDA.test(commandForMakako)) {
      damageCommands.push(commandForMakako.replace(regExpDA, "DA{$1}+(X)") + " ※麻迦古 ※Xは消費MP")
    }

    damageCommands.push("X+2D10 麻迦古ダメージ ※Xは成功数")
  }

  // 禍津を追加
  const commandForMagatsu = commands.find(command => command.includes(magatsuSkill))
  if (magatsuSkill && commandForMagatsu) {
    // 禍津ダメージを追加
    switch (magatsuSkill) {
      case "武術":
        if (strengthLevel === 0) {
          damageCommands.push("XD3+(2+{死穢})D4 禍津ダメージ ※Xは成功数")
        } else {
          damageCommands.push(`XD3+(2+{死穢})D4+${strengthLevel} 禍津ダメージ ※Xは成功数`)
        }
        break
      case "★奥義":
        if (strengthLevel === 0) {
          damageCommands.push("XD6+(2+{死穢})D4 禍津ダメージ ※Xは成功数")
        } else {
          damageCommands.push(`XD6+(2+{死穢})D4+${strengthLevel} 禍津ダメージ ※Xは成功数`)
        }
        break
      case "＊投擲":
        damageCommands.push("X+(2+{死穢})D4 禍津ダメージ ※Xは成功数")
        break
      default:
        break
    }
  }

  // 天之返矢を追加
  const commandForAmanokaeshiya = commands.find(command => command.includes("危機察知"))
  if (withAmanokaeshiya && commandForAmanokaeshiya) {
    damageCommands.push("1D6 天之返矢消費MP")
  }

  // 出力用にダメージ算出コマンドを追加
  if (damageCommands.length > 0) {
    outputCommands.push(`//${fullBlank}攻撃・回復`)
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
