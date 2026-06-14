import { Link, useLocation } from 'react-router-dom';
import { Compass, MessageCircle, Users, UsersRound, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useUnread } from '../hooks/useUnread';

const menu = [
  { name: 'Scopri', path: '/dashboard/scopri', icon: Compass },
  { name: 'Messaggi', path: '/dashboard/messaggi', icon: MessageCircle },
  { name: 'Connessioni', path: '/dashboard/connessioni', icon: Users },
  { name: 'Team', path: '/dashboard/team', icon: UsersRound },
  { name: 'Profilo', path: '/dashboard/profilo', icon: User },
];

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useAuth();
  const { totalUnread } = useUnread();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-lg border-r flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-blue-600">Nesso</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link key={item.path} to={item.path}>
              <div className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition relative ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`}>
                <Icon size={20} />
                <span>{item.name}</span>
                {item.name === 'Messaggi' && totalUnread > 0 && (
                  <span className="absolute top-1 right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {totalUnread}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t">
        <button onClick={logout} className="flex items-center gap-3 p-3 w-full rounded-lg hover:bg-red-50 text-red-600">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}