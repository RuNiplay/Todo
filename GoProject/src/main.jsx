import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LeftBlock from './MainComponents/LeftBlock.jsx'
import FormTasks from './MainComponents/FormTasks.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div style={{ display: 'flex' }}>
      <LeftBlock />
      <FormTasks />
    </div>
  </StrictMode>,
)