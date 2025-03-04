import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import BlobCursor from './BlobCursor.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <BlobCursor /> */}
    <App />
  </StrictMode>,
)
