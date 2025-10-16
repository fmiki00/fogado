import React, { useEffect, useState } from 'react'
import '../styles/szobakihasznaltsag.css'

import topImg from '../img/top.jpg'
import ketagyasImg from '../img/ketagyas.jpg'

function Szobakkihasznaltsag() {
  const [occupancy, setOccupancy] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/szobakkihasznaltsag')
      .then((r) => r.json())
      .then((data) => setOccupancy(data || []))
      .catch((e) => {
        console.error('/szobakkihasznaltsag fetch error', e)
        setOccupancy([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="szoba-oldal">
      <div className="sk-top">
        <img src={topImg} alt="Top" className="sk-top-img" />
      </div>

      <div className="szoba-grid">
        <section className="col col-white">
          <h3>Falusi szálláshely fajtái</h3>
          <ul className="dot-list">
            <li>Vendégszoba: a vendégek részére önálló lakóegység.</li>
            <li>Lakrészek: több szobás, külön bejárattal.</li>
            <li>Vendégház: több szoba, panziós jellegű elhelyezés.</li>
            <li>Sátorozóhely: kiegészítő nyári elhelyezés.</li>
          </ul>

          <div className="col-image-wrap">
            <img src={ketagyasImg} alt="Kétágyas szoba" className="col-image" />
          </div>
        </section>

        <aside className="col col-dark">
          <h3>Szobák kihasználtsága</h3>

          <div className="occupancy-table-wrap">
            {loading ? (
              <div className="loader">Betöltés…</div>
            ) : occupancy.length === 0 ? (
              <div className="loader">Nincsenek adatok</div>
            ) : (
              <table className="occupancy-table">
                <thead>
                  <tr>
                    <th>Szoba neve</th>
                    <th>Vendégek száma</th>
                    <th>Vendégéjszakák</th>
                  </tr>
                </thead>
                <tbody>
                  {occupancy.map((r, i) => (
                    <tr key={i}>
                      <td>{r.sznev ?? r.szoba ?? '—'}</td>
                      <td>{r.vendegek ?? r.vendeg ?? '—'}</td>
                      <td>{r.vendeg_ejszakak ?? r.ejszakak ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Szobakkihasznaltsag;