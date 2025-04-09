import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata = {
  title: 'DONNA - AI-Powered Legal Case Management',
  description: 'DONNA transforms how Indian attorneys manage cases, deadlines, and workflows with cutting-edge AI-powered intelligence.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  )
}