import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Web3Provider } from './context/Web3.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <ThemeProvider defaultTheme="light">
            <Web3Provider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </Web3Provider>
        </ThemeProvider>
    </BrowserRouter>,
)
