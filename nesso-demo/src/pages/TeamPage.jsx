import { useState, useEffect } from 'react';
import api from '../lib/axios';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';
import TeamChat from '../components/TeamChat';

export default function TeamPage() {
  const { user } = useAuth();
  const socket = useSocket(user?.id);
  const [myTeams, setMyTeams] = useState([]);
  const [availableTeams, setAvailableTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newExamTitle, setNewExamTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const loadTeams = async () => {
    const myRes = await api.get('/teams');
    setMyTeams(myRes.data);
    const allRes = await api.get('/teams/all');
    setAvailableTeams(allRes.data.filter(t => !t.is_member));
  };

  useEffect(() => {
    loadTeams();
  }, []);

  const createTeam = async () => {
    if (!newExamTitle.trim() || !newDescription.trim()) return;
    await api.post('/teams', { exam_title: newExamTitle, description: newDescription });
    setNewExamTitle('');
    setNewDescription('');
    setShowCreateForm(false);
    loadTeams();
  };

  const joinTeam = async (teamId) => {
    if (!window.confirm('Vuoi unirti a questo team?')) return;
    try {
      await api.post(`/teams/join/${teamId}`);
      alert('Ora sei membro del team!');
      loadTeams();
    } catch (err) {
      alert(err.response?.data?.error || 'Errore');
    }
  };

  const openTeamChat = (team, isMyTeam = false) => {
    if (!isMyTeam && !team.is_member) {
      alert('Devi prima unirti al team');
      return;
    }
    setSelectedTeam(team);
  };

  return (
    <div className="flex h-[80vh] gap-4">
      <div className="w-1/3 bg-white rounded shadow p-4 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg">I miei team</h2>
          <button onClick={() => setShowCreateForm(true)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm">
            + Nuovo team
          </button>
        </div>
        {myTeams.length === 0 && <p className="text-gray-500">Nessun team, creane uno o unisciti a un team esistente</p>}
        {myTeams.map(team => (
          <div
            key={team.id}
            onClick={() => openTeamChat(team, true)}
            className="p-3 border-b cursor-pointer hover:bg-gray-50"
          >
            <div className="font-semibold">{team.exam_title}</div>
            <div className="text-xs text-gray-500 truncate">{team.description}</div>
            <div className="text-xs text-gray-400">Membri: {team.members?.length || 1}/4</div>
          </div>
        ))}

        <h2 className="font-bold text-lg mt-6 mb-2">Team disponibili</h2>
        {availableTeams.length === 0 && <p className="text-gray-500">Nessun team disponibile</p>}
        {availableTeams.map(team => (
          <div key={team.id} className="p-3 border-b">
            <div className="font-semibold">{team.exam_title}</div>
            <div className="text-xs text-gray-500 truncate">{team.description}</div>
            <div className="text-xs text-gray-400">Membri: {team.member_count}/4</div>
            <button onClick={() => joinTeam(team.id)} className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm">
              Unisciti
            </button>
          </div>
        ))}
      </div>

      <div className="flex-1 bg-white rounded shadow">
        {selectedTeam ? (
          <TeamChat teamId={selectedTeam.id} socket={socket} userId={user.id} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Seleziona un team per iniziare a chattare
          </div>
        )}
      </div>

      {showCreateForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Crea un nuovo team</h2>
            <input
              type="text"
              placeholder="Titolo (es. Esame di Matematica)"
              value={newExamTitle}
              onChange={e => setNewExamTitle(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />
            <textarea
              placeholder="Descrizione del gruppo (es. prepariamo insieme l'esame)"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              className="w-full border p-2 rounded mb-3"
              rows="3"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowCreateForm(false)} className="px-4 py-2 bg-gray-300 rounded">Annulla</button>
              <button onClick={createTeam} className="px-4 py-2 bg-blue-600 text-white rounded">Crea</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}