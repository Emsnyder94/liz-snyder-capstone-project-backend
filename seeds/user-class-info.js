import userData from "../seed-data/user.js";
import classesData from "../seed-data/classes.js";
import myClassesData from "../seed-data/myClasses.js";

export const seed = async function (knex) {
  await knex("user").del();
  await knex("user").insert(userData);
  await knex("classes").del();
  await knex("classes").insert(classesData);
  await knex("my_classes").del();
  await knex("my_classes").insert(myClassesData);
};
