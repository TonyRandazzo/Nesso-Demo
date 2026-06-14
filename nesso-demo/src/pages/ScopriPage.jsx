import { useState, useEffect } from 'react';
import api from '../lib/axios';
import { useGeolocation } from '../hooks/useGeolocation';
import { useGeolocationConsent } from '../hooks/useGeolocationConsent';

export default function ScopriPage() {
  const [radius, setRadius] = useState(100);
  const [sameUniversita, setSameUniversita] = useState(true);
  const [samePercorso, setSamePercorso] = useState(false);
  const [sameEsame, setSameEsame] = useState(false);
  const [results, setResults] = useState([]);
  const { latitude, longitude, address, loadingAddress, getLocation, setManualLocation } = useGeolocation();
  const { consentGiven, askForConsent, grantConsent, denyConsent, resetConsent } = useGeolocationConsent();
  const [manualCity, setManualCity] = useState('');
  const [showLocationDisabledMsg, setShowLocationDisabledMsg] = useState(false);

  useEffect(() => {
    if (consentGiven === true && latitude && longitude) {
      api.post('/profile/location', { lat: latitude, lng: longitude });
    }
  }, [latitude, longitude, consentGiven]);

  const search = async () => {
    try {
      const params = { radiusKm: radius, sameUniversita: sameUniversita.toString() };
      const userProfile = await api.get('/profile');
      if (samePercorso) params.corso = userProfile.data.corso_laurea;
      if (sameEsame && userProfile.data.esami.length > 0) params.esame = userProfile.data.esami[0];
      const res = await api.get('/search', { params });
      setResults(res.data);
      if (res.data.length === 0) setShowLocationDisabledMsg(false);
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data?.error?.includes('Posizione non impostata')) {
        setShowLocationDisabledMsg(true);
      } else {
        alert(err.response?.data?.error || 'Errore ricerca');
      }
    }
  };

  const sendRequest = async (targetUserId) => {
    await api.post('/connections/request', { targetUserId });
    alert('Richiesta inviata');
  };

  const handleManualSubmit = () => {
    if (!consentGiven) {
      alert('Devi prima accettare la condivisione della posizione');
      return;
    }
    if (manualCity.trim()) {
      setManualLocation(manualCity);
      setManualCity('');
    } else {
      alert('Inserisci una città');
    }
  };

  const handleGetLocation = () => {
    if (!consentGiven) {
      alert('Devi prima accettare la condivisione della posizione');
      return;
    }
    getLocation();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Scopri</h1>
      <p className="text-gray-600 mb-6">Studenti telematici intorno a te.</p>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <div className="mb-6">
          <label className="block font-semibold text-gray-700 mb-2">Raggio</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="0"
              max="500"
              step="10"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-gray-800 font-medium min-w-[60px]">{radius} km</span>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={sameUniversita}
              onChange={(e) => setSameUniversita(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Stessa università</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={samePercorso}
              onChange={(e) => setSamePercorso(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Stesso percorso</span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={sameEsame}
              onChange={(e) => setSameEsame(e.target.checked)}
              className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-700">Stesso esame</span>
          </label>
        </div>

        <button onClick={search} className="bg-blue-600 text-white px-8 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Cerca
        </button>
      </div>

      {showLocationDisabledMsg && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
          La tua posizione non è impostata. Per ricevere risultati rilevanti, condividi la tua posizione (consenso richiesto).
        </div>
      )}

      {results.length === 0 && !showLocationDisabledMsg && (
        <div className="text-center py-12 bg-gray-50 rounded-xl">
          <p className="text-gray-500">Nessuno studente trovato con questi filtri.</p>
          <p className="text-gray-400 text-sm mt-1">Prova ad ampliare il raggio.</p>
        </div>
      )}

      <div className="space-y-4">
        {results.map((user) => (
          <div key={user.user_id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-semibold text-gray-800">{user.nome} {user.cognome}</p>
              <p className="text-sm text-gray-600">{user.universita_telematica} – {user.corso_laurea}</p>
              <p className="text-sm text-gray-500">Esami: {user.esami?.join(', ') || '—'}</p>
            </div>
            <button onClick={() => sendRequest(user.user_id)} className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700 transition">
              Connetti
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-4 rounded-xl shadow-sm">
        <h3 className="font-semibold mb-2">La tua posizione</h3>
        {address ? (
          <p className="text-green-700 bg-green-50 p-2 rounded">{address}</p>
        ) : (
          <p className="text-gray-500">
            {consentGiven === false
              ? 'Hai negato il consenso alla geolocalizzazione. La ricerca sarà limitata.'
              : 'Posizione non ancora condivisa'}
          </p>
        )}
        <div className="flex gap-3 mt-3">
          <button onClick={handleGetLocation} className="bg-blue-500 text-white px-4 py-1 rounded">
            Usa posizione attuale
          </button>
          <div className="flex gap-2 flex-1">
            <input
              type="text"
              value={manualCity}
              onChange={(e) => setManualCity(e.target.value)}
              placeholder="Città"
              className="border p-1 rounded flex-1"
            />
            <button onClick={handleManualSubmit} className="bg-gray-600 text-white px-3 py-1 rounded">
              Imposta
            </button>
          </div>
        </div>
        {consentGiven === false && (
          <button onClick={resetConsent} className="mt-3 text-sm text-blue-600 underline">
            Riapri richiesta consenso geolocalizzazione
          </button>
        )}
      </div>

      {askForConsent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h3 className="text-xl font-bold mb-3">Condividi la tua posizione?</h3>
            <p className="text-gray-600 mb-4">
              Per permetterti di trovare studenti vicini a te, abbiamo bisogno di accedere alla tua posizione.
              Puoi negare il consenso, ma la funzionalità di ricerca basata sulla distanza non sarà disponibile.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={denyConsent} className="px-4 py-2 bg-gray-300 rounded">Non ora</button>
              <button onClick={grantConsent} className="px-4 py-2 bg-blue-600 text-white rounded">Consenti</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}