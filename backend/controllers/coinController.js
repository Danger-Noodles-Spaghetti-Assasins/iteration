import axios from "axios";
import supabase from "../supabase/supabaseClient.js";

const coinController = {};

coinController.favCoin = async (req, res, next) => {
  const { userId, coinId } = req.body;
  try {
    const { error } = await supabase
      .from("favorites")
      .insert({ user_id: userId, coin_id: coinId });
    console.log("Entry added to favorites table");
    if (error) {
      throw error;
    } else return next();
  } catch (err) {
    const errObj = {
        log: `Favoriting coin failed: ${err}`,
        message: { err: "favoriting coin failed, check server log for details" },
      };
      return next(errObj);
  }
};

export default coinController;