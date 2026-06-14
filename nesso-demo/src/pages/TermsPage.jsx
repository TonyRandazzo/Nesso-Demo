export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Termini e Condizioni</h1>
      <div className="prose prose-gray">
        <p>Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
        
        <h2>Accettazione dei termini</h2>
        <p>Utilizzando Nesso Platform, accetti integralmente i presenti Termini e Condizioni.</p>
        
        <h2>Registrazione e account</h2>
        <p>Devi fornire informazioni veritiere. Sei responsabile della sicurezza della tua password. Nesso non è responsabile per accessi non autorizzati dovuti a negligenza dell'utente.</p>
        
        <h2>Condotta vietata</h2>
        <p>È vietato:</p>
        <ul>
          <li>Pubblicare contenuti illegali, offensivi, diffamatori o che violino diritti altrui.</li>
          <li>Usare la piattaforma per attività fraudolente o spam.</li>
          <li>Caricare file dannosi (virus, malware).</li>
          <li>Violare la privacy altrui.</li>
        </ul>
        <p>Nesso si riserva il diritto di sospendere o cancellare l'account in caso di violazione.</p>
        
        <h2>Proprietà intellettuale</h2>
        <p>Il codice sorgente e il design della piattaforma sono di proprietà di Nesso. I contenuti caricati dagli utenti rimangono di loro proprietà, ma concedono a Nesso una licenza per memorizzarli e mostrarli secondo le funzionalità del servizio.</p>
        
        <h2>Limitazione di responsabilità</h2>
        <p>Nesso non è responsabile per danni derivanti da:</p>
        <ul>
          <li>Interruzioni temporanee del servizio per manutenzione.</li>
          <li>Perdita di dati dovuta a cause di forza maggiore.</li>
          <li>Contenuti pubblicati da altri utenti.</li>
        </ul>
        
        <h2>Modifiche ai termini</h2>
        <p>Ci riserviamo di modificare i termini. Le modifiche saranno comunicate via email o con un avviso sulla piattaforma almeno 15 giorni prima dell'entrata in vigore.</p>
        
        <h2>Legge applicabile e foro</h2>
        <p>I termini sono regolati dalla legge italiana. Il foro esclusivo per qualsiasi controversia è Roma.</p>
        
        <h2>Contatti</h2>
        <p>Per domande: <a href="mailto:legal@nesso.com">legal@nesso.com</a></p>
      </div>
    </div>
  );
}