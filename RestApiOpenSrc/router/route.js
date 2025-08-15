const express = require("express");
const router = express.Router();
const db = require("../database");

// Create a todo
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  db.run(`INSERT INTO todos (title) VALUES (?)`, [title], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, completed: 0 });
  });
});

// Get all todos
router.get("/", (req, res) => {
  db.all(`SELECT * FROM todos`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update a todo
router.put("/:id", (req, res) => {
  const { completed } = req.body;
  db.run(`UPDATE todos SET completed = ? WHERE id = ?`, [completed, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo updated" });
  });
});

// Delete a todo
router.delete("/:id", (req, res) => {
  db.run(`DELETE FROM todos WHERE id = ?`, req.params.id, function (err) {
    if (err) return res.status(500).json({ error: err.message });
    if (this.changes === 0) return res.status(404).json({ error: "Todo not found" });
    res.json({ message: "Todo deleted" });
  });
});

module.exports = router;
