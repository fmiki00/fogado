import React, { useEffect, useState } from 'react'

import '../styles/hettorpe.css'

import topImg from '../img/top.jpg'
import hollokoImg from '../img/holloko_masolata.jpg'
import ketagyasImg from '../img/ketagyas.jpg'

function Hettorpe() {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3001/hettorpe')
      .then((r) => r.json())
      .then((data) => setRooms(data || []))
      .catch((e) => {
        console.error('/hettorpe fetch error', e)
        setRooms([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="hettorpe-page">
      <div className="hettorpe-top">
        <img src={topImg} alt="Top" className="hettorpe-top-img" />
      </div>

      <div className="hettorpe-grid">
        <aside className="col col-dark">
          <h3>Napraforgós Nemzeti Tanúsító</h3>
          <p>
            A falusi szálláshelyek napraforgós Nemzeti Tanúsító Védjegye a
            minőséget jelzi. A fogadó jó hangulatú, családias szolgáltatásokat
            kínál, helyi specialitásokkal.
          </p>
          <div className="col-image-wrap">
            <img src={hollokoImg} alt="Hollókő" className="col-image bordered" />
          </div>
        </aside>

        <section className="col col-white">
          <h3>Falusi szálláshely fajtái</h3>
          <ul className="dot-list">
            <li>Vendégszoba: önálló lakóegység a házban.</li>
            <li>Lakrészek: több szobás, külön bejárattal.</li>
            <li>Vendégház: kisebb panzió jellegű elhelyezés.</li>
            <li>Sátorozóhely: kiegészítő lehetőség nyári időszakban.</li>
          </ul>
          <div className="col-image-wrap">
            <img src={ketagyasImg} alt="Kétágyas szoba" className="col-image" />
          </div>
        </section>

        <section className="col col-dark">
          <h3>A hét törpe fogadó</h3>

          <div className="hettorpe-table-wrap">
            {loading ? (
              <div className="loader">Betöltés…</div>
            ) : (
              <table className="hettorpe-table">
                <thead>
                  <tr>
                    <th>Szoba neve</th>
                    <th>Ágyak száma</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.length === 0 ? (
                    <tr>
                      <td colSpan="2">Nincsenek adatok</td>
                    </tr>
                  ) : (
                    rooms.map((r, i) => (
                      <tr key={i}>
                        <td>{r.sznev ?? r.szoba ?? '—'}</td>
                        <td>{r.agy ?? r.agy ?? '—'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Hettorpe;