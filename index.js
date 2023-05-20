const express = require("express");
const signUpRouter = require("./Routes/user/signup");
const login = require("./Routes/user/login");
const { default: mongoose } = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const verifyToken = require("./auth/JWT-Auth");
dotenv.config();

//You cannot access any URI without token , except login

app.use(express.json());
app.use(verifyToken);
app.use(signUpRouter);
app.use(login);

//testing
app.get("/hi", (req, res) => {
  res.send("hi");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is live at ${PORT}`));

const url = process.env.URL;
mongoose
  .connect(url)
  .then(() => console.log("Database is connected"))
  .catch((err) => console.log(`Database isn't connected : ${err}`));
