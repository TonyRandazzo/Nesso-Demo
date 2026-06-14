export default function AttributionsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Attribuzioni e Licenze Open Source</h1>
      <div className="prose prose-gray">
        <p>Questo progetto utilizza i seguenti software open source:</p>
        
        <h2>Backend</h2>
        <ul>
          <li><strong>Node.js</strong> - Licenza MIT</li>
          <li><strong>Express</strong> - Licenza MIT</li>
          <li><strong>Socket.io</strong> - Licenza MIT</li>
          <li><strong>pg (node-postgres)</strong> - Licenza MIT</li>
          <li><strong>bcrypt</strong> - Licenza MIT</li>
          <li><strong>jsonwebtoken</strong> - Licenza MIT</li>
          <li><strong>multer</strong> - Licenza MIT</li>
          <li><strong>@supabase/supabase-js</strong> - Licenza MIT</li>
          <li><strong>geolib</strong> - Licenza MIT</li>
        </ul>
        
        <h2>Frontend</h2>
        <ul>
          <li><strong>React</strong> - Licenza MIT</li>
          <li><strong>React Router DOM</strong> - Licenza MIT</li>
          <li><strong>Vite</strong> - Licenza MIT</li>
          <li><strong>Tailwind CSS</strong> - Licenza MIT</li>
          <li><strong>Axios</strong> - Licenza MIT</li>
          <li><strong>socket.io-client</strong> - Licenza MIT</li>
          <li><strong>lucide-react</strong> - Licenza ISC</li>
        </ul>
        
        <p>Le licenze MIT e ISC consentono l'uso, la copia, la modifica e la distribuzione, a condizione che vengano mantenuti gli avvisi di copyright e la licenza originale. I dettagli completi sono disponibili nei repository ufficiali.</p>
        
        <p>Per il reverse geocoding e la ricerca di città, utilizziamo l'API <strong>Nominatim di OpenStreetMap</strong>, soggetta ai <a href="https://operations.osmfoundation.org/policies/nominatim/" target="_blank" rel="noopener noreferrer">termini di servizio di Nominatim</a>. Dati geografici © contributori OpenStreetMap.</p>
      </div>
    </div>
  );
}