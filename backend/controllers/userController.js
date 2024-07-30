import bcrypt from "bcryptjs";
import supabase from "../supabase/supabaseClient.js";

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
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ id: user.id, username: user.username });
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
    console.log("Tried Block Enter");
    const username = req.body.username;
    const password = await hashPassword(req.body.password);
    const email = req.body.email;
    console.log({ email }, req.body.email);
    const { error } = await supabase
      .from("users")
      .insert({ username, password: password, email: email });
    console.log("USER CREATED AND SAVED");
    if (error) {
      throw error;
    } else return next();
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
