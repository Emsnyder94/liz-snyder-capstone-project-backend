import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

export const userLogin = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(401)
      .json({ message: "Your email and password are required!" });
  }
  try {
    const login = await knex("user").where({ email }).first();
    if (!login) {
      res.status(401).json({ message: "Incorrect email or passowrd" });
    }

    if (login.password === password) {
      res.status(200).json({ id: login.id });
    } else {
      res.status(401).json({ message: "Incorrect email or passowrd" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error finding profile: ${error.message}" });
  }
};
