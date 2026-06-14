import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Footer from '../pages/Footer'

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <Outlet />
        <Footer></Footer>
      </main>
    </div>
  )
}