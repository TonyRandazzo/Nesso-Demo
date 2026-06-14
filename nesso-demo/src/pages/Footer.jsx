import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-6 text-center text-gray-500 text-sm">
        <div className="flex justify-center gap-6 mb-3">
          <Link to="/privacy" className="hover:text-blue-600">Privacy</Link>
          <Link to="/terms" className="hover:text-blue-600">Termini</Link>
          <Link to="/attributions" className="hover:text-blue-600">Open Source</Link>
        </div>
        <p>© 2026 Nesso Platform · Per studenti delle università telematiche</p>
      </div>
    </footer>
  );
}