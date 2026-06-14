import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate, Link } from 'react-router-dom'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/dashboard/scopri')
    } catch (err) {
      alert('Errore login')
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 flex-col justify-center px-12 py-16">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">N</div>
            <span className="text-gray-700 text-sm font-medium">Nesso</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">La rete degli studenti delle università telematiche.</h2>
          <p className="text-gray-600 mb-6">Trova chi studia il tuo stesso esame, collegati e formate team di studio.</p>
          <p className="text-gray-500 text-sm">Studiare online non significa studiare soli.</p>
        </div>
      </div>

      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center py-12 px-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8 lg:hidden">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-2xl font-bold">N</div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Nesso</h2>
            <p className="text-gray-600 mt-2">La rete degli studenti delle università telematiche.</p>
          </div>

          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Accedi a Nesso</h2>
          <p className="text-center text-gray-500 mb-6">Inserisci le tue credenziali per continuare</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input type="email" placeholder="la tua email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input type="password" placeholder="la tua password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500" required />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition mt-2">Accedi</button>
          </form>

          <p className="text-center text-gray-600 mt-6">Non hai un account? <Link to="/register" className="text-blue-600 hover:underline">Registrati</Link></p>
        </div>
      </div>
    </div>
  )
}