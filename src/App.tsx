import { Routes, Route, Navigate } from 'react-router-dom'
import ChatPalette from './ChatPalette'
import CcfoliaFormat from './CcfoliaFormat'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/kotoribako-chatpalette" element={<ChatPalette />} />
        <Route path="/kotoribako-chatpalette/ccfolia-format" element={<CcfoliaFormat />} />
        <Route path="*" element={<Navigate to="/kotoribako-chatpalette" />} />
      </Routes>
    </div>
  )
}

export default App
