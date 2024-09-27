import "dotenv/config";
import express from "express";
import userRoute from "./routes/userRoute.js";
import classesRoute from "./routes/classesRoute.js";
import loginRoute from "./routes/loginRoute.js";
import cors from "cors";

const app = express();

// below here, implement cors
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.use("/user", userRoute);
app.use("/classes", classesRoute);
app.use("/login", loginRoute);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
