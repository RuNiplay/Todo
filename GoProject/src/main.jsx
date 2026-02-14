import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LeftBlock from './MainComponents/LeftBlock.jsx'
import FormTasks from './MainComponents/FormTasks.jsx'
import Boards from './MainComponents/Boards.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{ display: 'flex', height: '100vh' }}>
      <LeftBlock />
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ flex: 1 }}>
          <FormTasks />
        </div>
        <div style={{ width: '4px', background: '#ccc', margin: '0 10px', borderRadius: '2px' }}></div>
        <div style={{ flex: 1 }}>
          <Boards />
        </div>
      </div>
    </div>
  </StrictMode>,
)