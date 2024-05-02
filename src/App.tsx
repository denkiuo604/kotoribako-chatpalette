import { Routes, Route, Navigate } from 'react-router-dom'
import ChatPalette from './ChatPalette'
import CcfoliaFormat from './CcfoliaFormat'
import NovelChatPalette from './novel/ChatPalette'
import NovelCcfoliaFormat from './novel/CcfoliaFormat'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/kotoribako-chatpalette" element={<ChatPalette />} />
        <Route path="/kotoribako-chatpalette/ccfolia-format" element={<CcfoliaFormat />} />
        <Route path="/kotoribako-chatpalette/novel" element={<NovelChatPalette />} />
        <Route path="/kotoribako-chatpalette/novel/ccfolia-format" element={<NovelCcfoliaFormat />} />
        <Route path="*" element={<Navigate to="/kotoribako-chatpalette" />} />
      </Routes>
    </div>
  )
}

export default App
