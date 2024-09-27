import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (_req, res) => {
  try {
    const data = await knex("user");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving User: ${err}`);
  }
};

export const getSingleUser = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const singleUser = await knex("user").where({ id: id }).first();
    if (!singleUser) {
      return res.status(404).json({ message: "User ID not found" });
    }
    const classes = await knex("my_classes")
      .join("classes", "my_classes.class_id", "classes.id")
      .where({ "my_classes.user_id": id })
      .select("classes.*");

    return res.status(200).json({ ...singleUser, classes });
  } catch (error) {
    res.status(500).send("Error getting user id", error);
  }
};

// add use POST request

export const addUser = async (req, res) => {
  console.log(req.body);
  const { name, email, password, DOB } = req.body;
  if (!name || !email || !password || !DOB) {
    return res.status(400).json({ message: "All fields must be filled out!" });
  }
  try {
    const data = await knex("user").insert({
      name,
      email,
      password,
      DOB,
    });
    console.log(data);
    const newUser = await knex("user").where({ id: data[0] }).first();
    console.log("working 2");
    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: `Unable to add new user: ${error.message}` });
  }
};

export const addClass = async (req, res) => {
  try {
    const { userId, classId } = req.params;

    const [myClass] = await knex("my_classes")
      .insert({ user_id: userId, class_id: classId })
      .returning("*");
    res.status(201).json({ id: myClass, ...req.params });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { index };
