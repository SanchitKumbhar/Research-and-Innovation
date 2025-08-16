const express = require("express");
const cors = require("cors");
const database=require("./database");

const app = express();
const todoRoutes = require("./router/route");
const auth = require("./router/userroutes");

app.use(cors()); // Allow all origins
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Open Todo API 🚀");
});

app.use("/todos", todoRoutes);
app.use("/auth", auth);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
