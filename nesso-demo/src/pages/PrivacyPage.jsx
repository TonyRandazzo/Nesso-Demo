import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-6">Informativa sulla Privacy</h1>
      <div className="prose prose-gray">
        <p>Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}</p>
        
        <h2>Titolare del trattamento</h2>
        <p>Nesso Platform (di seguito "Nesso", "noi", "nostro") è il Titolare del trattamento dei tuoi dati personali.</p>
        
        <h2>Dati raccolti</h2>
        <ul>
          <li><strong>Dati anagrafici</strong>: nome, cognome, email, password (memorizzata in forma crittografata).</li>
          <li><strong>Dati accademici</strong>: università telematica, corso di laurea, esami di interesse.</li>
          <li><strong>Dati di geolocalizzazione</strong>: latitudine e longitudine (solo se fornisci esplicitamente il consenso).</li>
          <li><strong>Contenuti generati</strong>: messaggi, file condivisi, richieste di connessione, team creati.</li>
        </ul>
        
        <h2>Finalità del trattamento</h2>
        <ul>
          <li>Fornire il servizio di networking accademico e messaggistica.</li>
          <li>Permettere la ricerca di studenti nelle vicinanze (previo consenso alla geolocalizzazione).</li>
          <li>Gestire chat e team di studio.</li>
          <li>Migliorare la sicurezza e prevenire abusi.</li>
        </ul>
        
        <h2>Base giuridica</h2>
        <p>Il trattamento è basato sull'esecuzione del contratto di servizio (art. 6(1)(b) GDPR) e, per la geolocalizzazione, sul consenso esplicito (art. 6(1)(a) GDPR).</p>
        
        <h2>Condivisione dei dati</h2>
        <p>I tuoi dati sono condivisi solo con:</p>
        <ul>
          <li><strong>Altri utenti</strong>: secondo le impostazioni di visibilità (connessioni, team).</li>
          <li><strong>Fornitori di servizi</strong>: Supabase (hosting database e storage), che agisce come Responsabile del trattamento.</li>
          <li><strong>Autorità pubbliche</strong>: se richiesto dalla legge.</li>
        </ul>
        
        <h2>Conservazione dei dati</h2>
        <p>I dati vengono conservati per tutta la durata dell'account. Dopo la cancellazione dell'account, vengono rimossi entro 30 giorni, salvo obblighi legali.</p>
        
        <h2>I tuoi diritti</h2>
        <p>Hai diritto a: accesso, rettifica, cancellazione, limitazione, portabilità, opposizione. Puoi esercitarli inviando una email a <a href="mailto:privacy@nesso.com">privacy@nesso.com</a>.</p>
        
        <h2>Diritto di reclamo</h2>
        <p>Puoi proporre reclamo al Garante per la Protezione dei Dati Personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">www.garanteprivacy.it</a>).</p>
      </div>
    </div>
  );
}