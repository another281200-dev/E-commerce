import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';

const dbPath = process.env.DB_PATH || path.resolve(process.cwd(), 'auth.json');
const adapter = new JSONFile(dbPath);
const db = new Low(adapter);

const initDb = async () => {
  await db.read();
  db.data ||= { users: [] };
  await db.write();
};

await initDb();

export const findUserByEmail = async (email) => {
  await db.read();
  return db.data?.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = async (id) => {
  await db.read();
  return db.data?.users.find((user) => user.id === id);
};

export const createUser = async (user) => {
  await db.read();
  db.data?.users.push(user);
  await db.write();
  return user;
};
