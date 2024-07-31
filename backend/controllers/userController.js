import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../supabase/supabaseClient.js";

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_WORK_FACTOR = 10;

const userController = {};

// route handler for request to /login
userController.logIn = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("username", username);

    if (error || data.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = data[0];
    res.locals.user = user;
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // generate jwt token
    const token = jwt.sign(
      { id: user.id, username: username.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    // save user and token to res.locals
    res.locals.user = { id: user.id, username: user.username };
    res.locals.token = token;
    return next();
  } catch (err) {
    next(err);
  }
};

userController.createUser = async (req, res, next) => {
  async function hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, SALT_WORK_FACTOR);
    return hashedPassword;
  }
  try {
    const username = req.body.username;
    const password = await hashPassword(req.body.password);
    const email = req.body.email;

    const { data, error } = await supabase
      .from("users")
      .insert({ username, password, email })
      .select("*"); // assuming supabase returns the inserted user data
    if (error) {
      throw error;
    }

    const user = data[0];

    // generate jwt token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // save user and token to res.locals
    res.locals.user = { id: user.id, username: user.username };
    res.locals.token = token;
    return next();
  } catch (err) {
    const errObj = {
      log: `Create user failed: ${err}`,
      message: { err: "create user failed, check server log for details" },
    };
    return next(errObj);
  }
};

// userController.favCoin = async()

export default userController;
