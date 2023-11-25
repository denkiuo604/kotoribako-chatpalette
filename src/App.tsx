import { Routes, Route } from 'react-router-dom'
import ChatPalette from './ChatPalette'
import CcfoliaFormat from './CcfoliaFormat'
import NotFound from './404'

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/kotoribako-chatpalette" element={<ChatPalette />} />
        <Route path="/kotoribako-chatpalette/ccfolia-format" element={<CcfoliaFormat />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
