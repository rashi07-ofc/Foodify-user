import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { ParallaxProvider } from 'react-scroll-parallax';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ParallaxProvider>
    <Provider store={store}>
      <App />
    </Provider>
    </ParallaxProvider>
  </StrictMode>,
)
