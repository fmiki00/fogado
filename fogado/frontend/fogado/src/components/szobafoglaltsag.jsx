import React from 'react'

import '../styles/szobafoglaltsag.css'
import topImg from '../img/top.jpg'

function Szobafoglaltsag({ bookings = [], roomName = '' }) {
  const formatDate = (d) => (d ? new Date(d).toLocaleDateString() : '')

  return (
    <div className="sf-oldal">
      <div className="sf-topkep">
        <img src={topImg} alt="Top" className="sf-top-img" />
      </div>

      <div className="sf-container">
        <h2 className="sf-cim">
          A választott szoba foglaltsága{roomName ? `: ${roomName}` : ''}
        </h2>

        {bookings.length === 0 ? (
          <p className="sf-empty">Nincsenek megjeleníthető adatok.</p>
        ) : (
          <div className="sf-table-wrap">
            <table className="sf-table">
              <thead>
                <tr>
                  <th>Szoba neve</th>
                  <th>Érkezés dátuma</th>
                  <th>Távozás dátuma</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={i}>
                    <td>{b.vnev ?? b.vendeg ?? '—'}</td>
                    <td>{formatDate(b.erk)}</td>
                    <td>{formatDate(b.tav)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Szobafoglaltsag;