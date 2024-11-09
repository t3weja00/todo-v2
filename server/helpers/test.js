import fs from 'fs'
import path from 'path'
import { pool} from './db.js'
import {hash, compare} from 'bcrypt'

import jwt from "jsonwebtoken";

const { sign } = jwt;

const __dirname = path.resolve();

const initializeTestDb = async () => {
    const sql = fs.readFileSync(path.resolve(__dirname, "todo.sql"), "utf8");
    try {
        await pool.query(sql);
        console.log("Initialized successfully");
      } catch (error) {
        console.error("Error initializing the database:", error);
        throw error;
      }
}

const insertTestUser = async(email, password) => {
    try {
        const hashedPassword = await hash(password, 10);
        await pool.query("INSERT INTO account (email, password) VALUES ($1, $2)", [
          email,
          hashedPassword,
        ]);
      } catch (error) {
        console.error("Error inserting test user:", error);
        throw error;
      }
    };

const getToken = (email) => {
    const token = sign({user:email}, process.env.JWT_SECRET_KEY);
    return token;
}

export {initializeTestDb, insertTestUser, getToken};