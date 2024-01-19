// import express dan routing
const express = require("express");
const router = require("../routes/api");

// import database
const db = require("./database/index");

// Membuat object express
const app = express();

// Menggunakan middleware
app.use(express.json());
app.use(express.urlencoded());

// Menggunakan routing (router)
app.use(router);

// pesan berhasil konek database
db.sync({ force: false }).then(() => {
    console.info("Koneksi Database Berhasil!!")
}).catch(err => {
    console.error("Koneksi Database Gagal: " + err.message)
});

// Mendefinisikan port.
app.listen(3000, () => console.log("Server is Running on http://localhost:3000"));