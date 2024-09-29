import '../globals.css'
import localFont from 'next/font/local'

const geistMono = localFont({ 
  src: [
    {
      path: '../fonts/GeistMonoVF.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/GeistVF.woff',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-geist',
})

export const metadata = {
  title: 'Therapist Dashboard',
  description: 'A comprehensive dashboard for therapists',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body>{children}</body>
    </html>
  )
}