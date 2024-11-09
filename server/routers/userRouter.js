import { pool } from '../helpers/db.js'
import { Router } from 'express'
import {hash, compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
import { registration, login } from '../controllers/userController.js'

const { sign } = jwt;

const router = Router();

router.post("/register", registration);
router.post("/login", login);

export default router; 