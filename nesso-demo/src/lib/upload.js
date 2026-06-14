export async function uploadChatFile(file) {
  const formData = new FormData();
  formData.append('file', file, file.name);
  const response = await fetch('http://localhost:5000/api/upload/chat', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
    body: formData,
  });
  if (!response.ok) throw new Error('Upload failed');
  return response.json();
}