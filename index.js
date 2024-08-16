const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const PORT = process.env.PORT || 4000;
require("dotenv").config();
const productRoute = require("./routes/productRoute");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("getting eat apple server");
});

app.use("/product", productRoute);

app.listen(PORT, () => {
  console.log(`server is running on port : ${PORT}`);
  connectDB();
});
