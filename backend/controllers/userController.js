import bcrypt from "bcryptjs";
import supabase from "../supabase/supabaseClient";

const SALT_WORK_FACTOR = 10;

// route handler for request to /login
export const logIn = async (req, res, next) => {
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
