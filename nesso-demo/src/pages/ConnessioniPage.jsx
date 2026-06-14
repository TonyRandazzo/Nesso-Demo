import { useState, useEffect } from 'react'
import api from '../lib/axios'

export default function ConnessioniPage() {
  const [pending, setPending] = useState([])
  const [accepted, setAccepted] = useState([])

  useEffect(() => {
    api.get('/connections/pending').then(res => setPending(res.data))
    api.get('/connections/accepted').then(res => setAccepted(res.data))
  }, [])

  const acceptRequest = async (connectionId) => {
    await api.post('/connections/accept', { connectionId })
    setPending(pending.filter(p => p.id !== connectionId))
    alert('Richiesta accettata')
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Le tue connessioni</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Richieste in attesa</h2>
        {pending.length === 0 && <p className="text-gray-500">Nessuna richiesta</p>}
        {pending.map(req => (
          <div key={req.id} className="bg-white p-4 rounded shadow flex justify-between items-center mb-2">
            <span>{req.nome} {req.cognome}</span>
            <button onClick={() => acceptRequest(req.id)} className="bg-green-500 text-white px-4 py-1 rounded">Accetta</button>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-3">Contatti collegati</h2>
        {accepted.length === 0 && <p className="text-gray-500">Nessun contatto</p>}
        {accepted.map(conn => (
          <div key={conn.user_id} className="bg-white p-4 rounded shadow mb-2">
            {conn.nome} {conn.cognome}
          </div>
        ))}
      </div>
    </div>
  )
}