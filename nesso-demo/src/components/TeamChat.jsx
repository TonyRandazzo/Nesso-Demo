import { useState, useEffect, useRef } from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { uploadChatFile } from '../lib/upload';
import api from '../lib/axios';

export default function TeamChat({ teamId, socket, userId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const fileInputRef = useRef();
  const { showNotification } = useNotifications();

  useEffect(() => {
    api.get(`/teams/${teamId}/messages`).then(res => setMessages(res.data));
    socket?.emit('join-team', { teamId });
    socket?.on('team-message', (msg) => {
      if (msg.teamId === teamId) {
        setMessages(prev => [...prev, msg]);
        if (msg.userId !== userId) {
          showNotification(`Nuovo messaggio nel team`, { body: msg.message || 'File allegato' });
        }
      }
    });
    return () => socket?.off('team-message');
  }, [teamId, socket, userId, showNotification]);

  const sendMessage = async () => {
    if (!input.trim() && !fileInputRef.current?.files[0]) return;
    let fileUrl = null, fileName = null;
    if (fileInputRef.current.files[0]) {
      const file = fileInputRef.current.files[0];
      const uploadRes = await uploadChatFile(file);
      fileUrl = uploadRes.fileUrl;
      fileName = uploadRes.fileName;
    }
    socket.emit('team-message', { teamId, userId, message: input, fileUrl, fileName });
    setInput('');
    fileInputRef.current.value = '';
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto space-y-2 p-2">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.user_id === userId ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-2 rounded-lg ${msg.user_id === userId ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              <p className="text-xs font-semibold">{msg.nome} {msg.cognome}</p>
              <p>{msg.message}</p>
              {msg.file_url && <a href={msg.file_url} download target="_blank" rel="noopener noreferrer" className="text-sm underline">📎 {msg.file_name}</a>}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-2 flex gap-2">
        <input type="file" ref={fileInputRef} className="hidden" />
        <button onClick={() => fileInputRef.current.click()} className="bg-gray-300 px-3 rounded">📎</button>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} className="flex-1 border rounded p-2" placeholder="Scrivi..." />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded">Invia</button>
      </div>
    </div>
  );
}