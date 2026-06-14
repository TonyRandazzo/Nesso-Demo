import { useState } from 'react'

export const useGeolocation = () => {
  const [latitude, setLatitude] = useState(null)
  const [longitude, setLongitude] = useState(null)
  const [address, setAddress] = useState('')
  const [comune, setComune] = useState('')
  const [provincia, setProvincia] = useState('')
  const [loadingAddress, setLoadingAddress] = useState(false)

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          const lat = pos.coords.latitude
          const lng = pos.coords.longitude
          setLatitude(lat)
          setLongitude(lng)
          await reverseGeocode(lat, lng)
        },
        (err) => alert('Geolocalizzazione non disponibile: ' + err.message)
      )
    } else {
      alert('Geolocalizzazione non supportata')
    }
  }

  const reverseGeocode = async (lat, lng) => {
    setLoadingAddress(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
      )
      const data = await response.json()
      if (data && data.address) {
        const city = data.address.city || data.address.town || data.address.village || data.address.hamlet || ''
        const provinceCode = data.address.state_district || data.address.county || data.address.province || ''
        const country = data.address.country || ''
        const formatted = `${city}${provinceCode ? ` (${provinceCode})` : ''}, ${country}`
        setAddress(formatted)
        setComune(city)
        setProvincia(provinceCode)
      } else {
        setAddress('Posizione rilevata ma indirizzo non trovato')
        setComune('')
        setProvincia('')
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      setAddress('Errore nel recupero indirizzo')
      setComune('')
      setProvincia('')
    } finally {
      setLoadingAddress(false)
    }
  }

  const setManualLocation = async (cityName) => {
    setLoadingAddress(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}&limit=1`
      )
      const data = await response.json()
      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat)
        const lng = parseFloat(data[0].lon)
        setLatitude(lat)
        setLongitude(lng)
        await reverseGeocode(lat, lng)
      } else {
        alert('Città non trovata')
      }
    } catch (error) {
      console.error('Geocoding error:', error)
      alert('Errore nel cercare la città')
    } finally {
      setLoadingAddress(false)
    }
  }

  return { latitude, longitude, address, comune, provincia, loadingAddress, getLocation, setManualLocation }
}