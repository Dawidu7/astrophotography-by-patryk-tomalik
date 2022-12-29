import { Navbar, Footer } from '../components'

import { AuthProvider } from '../hooks/useAuth'

import '../styles/globals.css'


const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <head />
      <body className='bg-dark text-[#c0c0c0]'>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}

export default RootLayout