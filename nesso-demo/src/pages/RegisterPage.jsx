import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

export default function RegisterPage() {
  const [nome, setNome] = useState('');
  const [cognome, setCognome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [universita, setUniversita] = useState('');
  const [corso, setCorso] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setIsSubmitting(true);
    try {
      await register(email, password, nome, cognome, universita, corso);
      navigate('/dashboard/scopri');
    } catch (err) {
      const errorMessage = err.response?.data?.error || '';
      if (errorMessage.toLowerCase().includes('duplicate') || errorMessage.toLowerCase().includes('already exists')) {
        setEmailError('Account già esistente con questa email. Prova ad accedere o usa un’altra email.');
      } else {
        alert('Errore registrazione: ' + errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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

          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-2">Crea il tuo account</h2>
          <p className="text-center text-gray-500 mb-6">Inizia a connetterti con la tua rete.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">Nome e cognome</label>
              <div className="flex gap-3">
                <input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} className="w-1/2 border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500" required disabled={isSubmitting} />
                <input type="text" placeholder="Cognome" value={cognome} onChange={(e) => setCognome(e.target.value)} className="w-1/2 border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500" required disabled={isSubmitting} />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Università telematica</label>
              <input type="text" placeholder="Es. Università Telematica eCampus" value={universita} onChange={(e) => setUniversita(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500" required disabled={isSubmitting} />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Corso di laurea / percorso</label>
              <input type="text" placeholder="Es. Ingegneria Informatica" value={corso} onChange={(e) => setCorso(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500" required disabled={isSubmitting} />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                placeholder="la tua email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                }}
                className={`w-full border rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 ${emailError ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                required
                disabled={isSubmitting}
              />
              {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">Password</label>
              <input type="password" placeholder="scegli una password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500" required disabled={isSubmitting} />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-blue-400">
              {isSubmitting ? 'Registrazione in corso...' : 'Crea account'}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Hai già un account? <Link to="/login" className="text-blue-600 hover:underline">Accedi</Link>
          </p>
        </div>
      </div>
    </div>
  );
}