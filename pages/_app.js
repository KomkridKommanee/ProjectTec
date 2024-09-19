import { Layout } from 'antd'
import '../styles/globals.css'
import { AuthProvider } from './hook/useAuth'




function MyApp({ Component, pageProps }) {

  return (
    <>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )


}

export default MyApp
