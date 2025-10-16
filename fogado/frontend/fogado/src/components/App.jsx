import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import './App.css'

import Navbar from './Navbar'
import Hettorpe from './hettorpe'
import Szobakkihasznaltsag from './szobakihasznaltsag'
import Szobafoglaltsag from './szobafoglaltsag'

function Home() {
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Főoldal</h1>
      <p>Üdv a hét törpe fogadó alkalmazásában.</p>
    </div>
  )
}

function App() {
  const [rooms, setRooms] = useState([])
  const [occupancy, setOccupancy] = useState([])
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/hettorpe')
      .then((res) => res.json())
      .then(setRooms)
      .catch((err) => console.error('Error loading /hettorpe:', err))

    fetch('http://localhost:3001/szobakkihasznaltsag')
      .then((res) => res.json())
      .then(setOccupancy)
      .catch((err) => console.error('Error loading /szobakkihasznaltsag:', err))

    fetch('http://localhost:3001/szobafoglaltsag')
      .then((res) => res.json())
      .then(setBookings)
      .catch((err) => console.error('Error loading /szobafoglaltsag:', err))
  }, [])

  return (
    <Router>
      <Navbar />
      <div className="container" style={{ paddingTop: '72px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hettorpe" element={<Hettorpe />} />
          <Route path="/kihasznaltsag" element={<Szobakkihasznaltsag occupancy={occupancy} />} />
          <Route path="/foglaltsag" element={<Szobafoglaltsag bookings={bookings} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
