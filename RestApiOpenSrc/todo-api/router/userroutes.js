const express = require("express");
const hash = require("bcryptjs");
const router = express.Router();
const async_handler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "server.js";
const db = require("../database");
// 🔑 move this to .env in real apps

router.post("/signup", async_handler(async (req, res) => {
    const { username, password } = req.body;

    const pass = await hash.hash(password, 10);
    db.run(`INSERT INTO User (username,password) VALUES (?,?)`, [username, pass], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: "user created!!!" });
    });

}));

router.post("/login", async_handler(async (req, res) => {
    const { username, password } = req.body;

    db.get(`SELECT * FROM User WHERE username = ?`, [username], async (err, user) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!user) return res.status(400).json({ error: "User not found" });
        const compare = await hash.compare(password, user.password);
        if (!compare) return res.status(400).json({ error: "Invalid password" });

        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
        res.cookie("token", token, { httpOnly: true });
        res.json({ message: "Login successful", token });
    })
}));

module.exports = router;