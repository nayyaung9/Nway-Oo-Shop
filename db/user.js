import { nanoid } from "nanoid";

export async function findUserById(db, userId) {
  return db
    .collection("users")
    .findOne({
      _id: userId,
    })
    .then((user) => user || null);
}

export async function findUserByEmail(db, email) {
  return db
    .collection("users")
    .findOne({
      email,
    })
    .then((user) => user || null);
}
export async function registerUser(db, { email, password, fullname }) {
  return db
    .collection("users")
    .insertOne({
      _id: nanoid(12),
      email,
      password,
      fullname,
    })
    .then(({ ops }) => ops[0]);
}
