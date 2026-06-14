import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useGeolocation } from '../hooks/useGeolocation';
import api from '../lib/axios';
import { useNavigate } from 'react-router-dom';

export default function ProfiloPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { getLocation } = useGeolocation();
  const [form, setForm] = useState({ nome: '', cognome: '', universita_telematica: '', corso_laurea: '', esami: '' });

  useEffect(() => {
    api.get('/profile').then(res => {
      const p = res.data;
      setForm({ nome: p.nome || '', cognome: p.cognome || '', universita_telematica: p.universita_telematica || '', corso_laurea: p.corso_laurea || '', esami: (p.esami || []).join(', ') });
    });
  }, []);

  const updateProfile = async () => {
    const esamiArray = form.esami.split(',').map(s => s.trim()).filter(s => s);
    await api.put('/profile', { ...form, esami: esamiArray });
    alert('Profilo aggiornato');
  };

  const handleDeleteAccount = async () => {
    const confirm = window.confirm('Sei sicuro di voler cancellare il tuo account? Tutti i tuoi dati, messaggi e connessioni saranno eliminati permanentemente. Questa azione è irreversibile.');
    if (!confirm) return;
    try {
      await api.delete('/profile');
      logout();
      navigate('/');
      alert('Account cancellato con successo');
    } catch (err) {
      alert('Errore durante la cancellazione: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Il tuo profilo</h1>
      <div className="space-y-4">
        <input type="text" placeholder="Nome" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Cognome" value={form.cognome} onChange={e => setForm({...form, cognome: e.target.value})} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Università telematica" value={form.universita_telematica} onChange={e => setForm({...form, universita_telematica: e.target.value})} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Corso di laurea" value={form.corso_laurea} onChange={e => setForm({...form, corso_laurea: e.target.value})} className="w-full border p-2 rounded" />
        <input type="text" placeholder="Esami (separati da virgola)" value={form.esami} onChange={e => setForm({...form, esami: e.target.value})} className="w-full border p-2 rounded" />
        <button onClick={updateProfile} className="bg-blue-600 text-white px-4 py-2 rounded">Salva modifiche</button>
        <button onClick={getLocation} className="bg-green-600 text-white px-4 py-2 rounded ml-2">Aggiorna posizione</button>
        <button onClick={handleLogout} className="bg-gray-600 text-white px-4 py-2 rounded ml-2">Logout</button>
        <hr className="my-4" />
        <div className="border-t pt-4">
          <h2 className="text-red-600 font-semibold mb-2">Zona pericolo</h2>
          <button onClick={handleDeleteAccount} className="bg-red-600 text-white px-4 py-2 rounded">Cancella account</button>
          <p className="text-xs text-gray-500 mt-2">Questa azione è irreversibile. Tutti i tuoi dati, messaggi e connessioni saranno eliminati.</p>
        </div>
      </div>
    </div>
  );
}