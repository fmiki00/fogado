const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    port: 3306,
    password: "", 
    database: "fogado",
}); 

app.get("/", (req, res) => {
    res.send("fut a szerver!");
});

app.get("/hettorpe", (req, res) => {
    const sql = "SELECT DISTINCT sznev, agy FROM foglalasok INNER JOIN szobak ON foglalasok.szoba = szobak.szazon INNER JOIN vendegek ON foglalasok.vendeg = vendegek.vsorsz;";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
})

app.get("/szobakkihasznaltsag", (req, res) =>{

    const sql = "SELECT szobak.sznev AS szoba, COUNT(foglalasok.vendeg) AS vendegek, SUM(DATEDIFF(foglalasok.tav, foglalasok.erk)) AS vendeg_ejszakak FROM foglalasok INNER JOIN szobak ON foglalasok.szoba = szobak.szazon GROUP BY szobak.sznev ORDER BY vendeg_ejszakak DESC, vendegek ASC;";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
})

app.get("/szobafoglaltsag", (req, res) => {
    const sql = "SELECT vendegek.vnev, foglalasok.erk, foglalasok.tav FROM foglalasok JOIN vendegek ON foglalasok.vendeg = vendegek.vsorsz ORDER BY vendegek.vnev";
    db.query(sql, (err, result) => {
        if (err) return res.json(err);
        return res.json(result)
    })
})

app.listen(3001, () => {
    console.log("A szerver a 3001-es porton fut!");
});