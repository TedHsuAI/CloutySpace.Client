// AppLayout.tsx
import { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return <div className="min-h-screen bg-white text-black">{children}</div>
}

export default AppLayout
