import axios from "axios";
import supabase from "../supabase/supabaseClient.js";
import { jwtDecode } from "jwt-decode";

const coinController = {};

coinController.favCoin = async (req, res, next) => {
  const { coinId } = req.body;
  // console.log(jwtDecode(req.cookies.user));
  const { id } = jwtDecode(req.cookies.user)
  console.log('userId', id);
  console.log('coinId', coinId);
  try {
    const { error } = await supabase
      .from("favorites")
      .insert({ user_id: id, coin_id: coinId });
    if (error) {
      throw error;
    } else 
      console.log("Entry added to favorites table");
      return next();
  } catch (err) {
    const errObj = {
        log: `Favoriting coin failed: ${err}`,
        message: { err: "favoriting coin failed, check server log for details" },
      };
      return next(errObj);
  }
};

export default coinController;