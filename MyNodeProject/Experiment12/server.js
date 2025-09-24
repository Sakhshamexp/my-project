const express = require("express");
const cors = require("cors");
const { getSeats, lockSeat, confirmSeat } = require("./seatHandler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/seats", (req, res) => {
  const seats = getSeats();
  res.json(seats); // return all seat info
});

app.post("/lock/:id", (req, res) => {
  const { id } = req.params;
  const result = lockSeat(id);
  res.status(result.success ? 200 : 400).json({ message: result.message });
});

app.post("/confirm/:id", (req, res) => {
  const { id } = req.params;
  const result = confirmSeat(id);
  res.status(result.success ? 200 : 400).json({ message: result.message });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
