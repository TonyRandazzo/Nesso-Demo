import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../hooks/useSocket';
import { useNotifications } from '../hooks/useNotifications';
import { uploadChatFile } from '../lib/upload';
import api from '../lib/axios';

export default function MessaggiPage() {
  const { user } = useAuth();
  const socket = useSocket(user?.id);
  const { showNotification } = useNotifications();
  const [connections, setConnections] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [unreadCounts, setUnreadCounts] = useState({});
  const [input, setInput] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    api.get('/connections/accepted').then(res => setConnections(res.data));
    api.get('/messages/unread').then(res => setUnreadCounts(res.data));
  }, []);

  useEffect(() => {
    if (!activeChat) return;
    api.put(`/messages/read/${activeChat}`);
    api.get(`/messages/${activeChat}`).then(res => {
      setMessages(res.data);
      setUnreadCounts(prev => ({ ...prev, [activeChat]: 0 }));
    });
    socket?.emit('join-private', { userId: user.id, otherId: activeChat });
    socket?.on('private-message', (msg) => {
      if (msg.from === activeChat || msg.to === activeChat) {
        setMessages(prev => [...prev, msg]);
        if (msg.from !== user.id && activeChat !== msg.from) {
          setUnreadCounts(prev => ({ ...prev, [msg.from]: (prev[msg.from] || 0) + 1 }));
          showNotification(`Nuovo messaggio da ${msg.fromName || 'Utente'}`, msg.message || 'File allegato');
        }
      }
    });
    return () => socket?.off('private-message');
  }, [activeChat, socket, user.id, showNotification]);

  const sendMessage = async () => {
    if (!input.trim() && !fileInputRef.current?.files[0]) return;
    let fileUrl = null, fileName = null;

    if (fileInputRef.current.files[0]) {
      const file = fileInputRef.current.files[0];
      if (!file || file.size === 0) {
        alert('Seleziona un file valido');
        return;
      } 
      const uploadRes = await uploadChatFile(file);
      fileUrl = uploadRes.fileUrl;
      fileName = uploadRes.fileName;
    }
    socket.emit('private-message', {
      from: user.id,
      to: activeChat,
      message: input,
      fileUrl,
      fileName
    });
    setInput('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex h-[80vh] bg-white rounded shadow">
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h2 className="font-bold mb-4">Conversazioni</h2>
        {connections.map(conn => (
          <div
            key={conn.user_id}
            onClick={() => setActiveChat(conn.user_id)}
            className="p-2 cursor-pointer hover:bg-gray-100 rounded flex justify-between items-center"
          >
            <span>{conn.nome} {conn.cognome}</span>
            {unreadCounts[conn.user_id] > 0 && (
              <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">{unreadCounts[conn.user_id]}</span>
            )}
          </div>
        ))}
      </div>
      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <div className="flex-1 overflow-auto p-4 space-y-2">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.from_user_id === user.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs p-2 rounded-lg ${msg.from_user_id === user.id ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    <p>{msg.message}</p>
                    {msg.file_url && (
                      <a href={msg.file_url} download target="_blank" rel="noopener noreferrer" className="text-sm underline">
                        📎 {msg.file_name}
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t p-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border rounded p-2"
                placeholder="Scrivi un messaggio..."
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/png,image/jpeg,application/pdf,image/jpg,image/gif,text/plain"
              />
              <button onClick={() => fileInputRef.current?.click()} className="bg-gray-300 px-3 rounded">
                📎
              </button>
              <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded">
                Invia
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">Seleziona una chat</div>
        )}
      </div>
    </div>
  );
}