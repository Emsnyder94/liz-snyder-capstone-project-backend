import initKnex from "knex";
import configuration from "../knexfile.js";
const knex = initKnex(configuration);

const index = async (_req, res) => {
  try {
    const data = await knex("classes");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving Classes: ${err}`);
  }
};

export const createClass = async (req, res) => {
  console.log(req.body);
  const { type, location, time, level } = req.body;
  if (!type || !location || !time || !level) {
    return res.status(400).json({ message: "All fields must be filled out!" });
  }
  try {
    const data = await knex("classes").insert({
      type,
      location,
      time,
      level,
    });
    const newClass = await knex("classes").where({ id: data[0] }).first();
    res.status(201).json(newClass);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Unable to create new class: ${error.message}" });
  }
};

export { index };
