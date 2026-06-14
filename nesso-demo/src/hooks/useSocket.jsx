import { useEffect, useRef } from 'react'
import io from 'socket.io-client'

export const useSocket = (userId) => {
  const socketRef = useRef(null)
  useEffect(() => {
    if (!userId) return
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000')
    return () => {
      if (socketRef.current) socketRef.current.disconnect()
    }
  }, [userId])
  return socketRef.current
}