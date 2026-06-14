import { Link } from 'react-router-dom'
import Footer from './Footer'

export default function LandingPage() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features')
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans flex flex-col">
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="https://nesso-connect-learn.lovable.app/__l5e/assets-v1/a0f31dfe-35c5-4d8c-bf2c-d7ad950c2af0/nesso-logo.jpg"
              alt="Nesso Logo"
              className="h-8 w-auto object-contain"
            />
            <span className="text-gray-700 font-medium text-sm">Nesso Platform</span>
          </div>

          <Link
            to="/register"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm hover:bg-blue-700 transition"
          >
            Accedi
          </Link>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center text-center py-16 px-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight max-w-4xl mx-auto">
          <span className="text-blue-700">Studiare online,</span>{' '}
          <span className="text-gray-800">smettere di studiare da soli.</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mt-6 mb-10 text-lg">
          Nesso è la rete che mette in contatto gli studenti delle università telematiche italiane.
          Trova chi prepara il tuo stesso esame, vicino a te. Collegati, parlate, formate un team.
        </p>
        <div className="flex gap-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Creare il tuo profilo
          </Link>
          <button
            onClick={scrollToFeatures}
            className="border border-gray-400 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Come funziona
          </button>
        </div>
      </div>

      <div id="features" className="bg-gray-50 py-16">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-4xl mb-3"> </div>
            <h3 className="text-xl font-bold mb-2">Scopri chi è vicino</h3>
            <p className="text-gray-600">
              Imposta la tua posizione e un raggio in km: vedi studenti telematici del tuo stesso percorso intorno a te.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-4xl mb-3"> </div>
            <h3 className="text-xl font-bold mb-2">Collegati</h3>
            <p className="text-gray-600">
              Manda richieste di collegamento agli studenti che preparano i tuoi esami. Sta a te scegliere con chi connetterti.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <div className="text-4xl mb-3"> </div>
            <h3 className="text-xl font-bold mb-2">Team fino a 4</h3>
            <p className="text-gray-600">
              Chatta, condividi link e documenti, crea team di studio fino a 4 persone per affrontare gli esami insieme.
            </p>
          </div>
        </div>
      </div>

    <Footer>
      
    </Footer>
    </div>
  )
}