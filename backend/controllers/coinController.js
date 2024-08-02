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
      .insert({ user_id: id, coin_name: coinId });
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

// New displayFavCoins function to retrieve only the coin names
coinController.displayFavCoins = async (req, res, next) => {
  const { id } = jwtDecode(req.cookies.user);

  try {
    const { data: favorites, error } = await supabase
      .from("favorites")
      .select("coin_name")
      .eq("user_id", id);

    if (error) {
      throw error;
    } else {
      res.locals.favCoins = favorites.map(fav => fav.coin_name);
      return next();
    }

  } catch (err) {
    const errObj = {
      log: `Fetching favorite coins failed: ${err}`,
      message: { err: "Fetching favorite coins failed, check server log for details" },
    };
    return next(errObj);
  }
};

export default coinController;