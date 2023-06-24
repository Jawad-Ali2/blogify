import { Navbar } from '@/components'
import './globals.css'

export const metadata = {
  title: 'Blogify',
  description: 'App where you can discover engaging stories, insights and ideas.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='relative'>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
