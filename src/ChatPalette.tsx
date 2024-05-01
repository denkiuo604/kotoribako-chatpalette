import { useState } from 'react'
import { Tooltip } from '@mui/material'
import './App.css'
import {
  clearing,
  copyTextToClipboard,
  createOutputChatPalette,
  iyasakaEquipCheckbox,
  sneaking,
  tamayura,
  magatsu,
} from './common'
import Footer from './Footer'
import { Helmet } from 'react-helmet'

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
  const [withMakako, setWithMakako] = useState(false)
  const [withHitokotonushi, setWithHitokotonushi] = useState(false)
  const [withAmanokaeshiya, setWithAmanokaeshiya] = useState(false)
  const [clearingSkill, setClearingSkill] = useState("")
  const [sneakingSkill, setSneakingSkill] = useState("")
  const [tamayuraSkill, setTamayuraSkill] = useState("")
  const [magatsuSkill, setMagatsuSkill] = useState("")
  const [showCopied, setShowCopied] = useState(false)

  const placeHolderOfChatPalette = "{共鳴}DM<={強度} 〈∞共鳴〉\n({共鳴}+1)DM<={強度} 〈∞共鳴〉ルーツ属性一致\n({共鳴}*2)DM<={強度} 〈∞共鳴〉完全一致\n..."

  // 出力ボタンクリック時の動作
  const onClickOutput = () => {
    // チャットパレット作成
    const output = createOutputChatPalette(
      inputChatPalette,
      withSukune,
      withKoumokuten,
      withToyosatomimi,
      withTengumino,
      withYagokoro,
      withYoichi,
      withRaiden,
      withYaobiku,
      withMakako,
      withHitokotonushi,
      withAmanokaeshiya,
      clearingSkill,
      sneakingSkill,
      tamayuraSkill,
      magatsuSkill,
    )
    // 作成したチャットパレットを出力欄にセット
    setOutputChatPalette(output)
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
    setWithMakako(false)
    setWithHitokotonushi(false)
    setWithAmanokaeshiya(false)
    setClearingSkill("")
    setSneakingSkill("")
    setTamayuraSkill("")
    setMagatsuSkill("")
  }

  return (
    <div className="App">
      <Helmet>
        <title>エモクロアTRPG『新約・コトリバコ』用 チャパレ加工ツール</title>
      </Helmet>
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
        <div className="iyasaka-equipments">
          追加データ装備
          {iyasakaEquipCheckbox("makako", "麻迦古", withMakako, setWithMakako)}
          {iyasakaEquipCheckbox("hitokotonushi", "一言主", withHitokotonushi, setWithHitokotonushi)}
          {iyasakaEquipCheckbox("amanokaeshiya", "天之返矢", withAmanokaeshiya, setWithAmanokaeshiya)}
        </div>
        <div className="magatsu">
          <label htmlFor="magatsu-skill">禍津で使う技能</label>
          <select
            id="magatsu-skill"
            name="magatsu-skill"
            value={magatsuSkill}
            onChange={(event) => setMagatsuSkill(event.target.value)}
          >
            <option value="">禍津未所持</option>
            {magatsu.map(skill => {
              return (
                <option key={skill} value={skill}>{skill}</option>
              )
            })}
          </select>
        </div>
        <p>
          <button onClick={() => onClickOutput()}>
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
            <button onClick={() => copyTextToClipboard(outputChatPalette, setShowCopied(true))}>
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
      <Footer
        toolName="チャパレ加工ツール"
        linkPath="/kotoribako-chatpalette/ccfolia-format"
        linkText="ココフォリア駒加工ツールへ"
      />
    </div>
  )
}

export default ChatPalette
