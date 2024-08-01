import express from "express";
import tiApiController from "../controllers/tiApiController.js";
import userController from "../controllers/userController.js";
import coinController from "../controllers/coinController.js";

const router = express.Router();

// GET Requests to retrieve data using the middleware routes
router.get("/coins", tiApiController.coinListMiddleware, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get("/ratings", tiApiController.ratingListMiddleware, (req, res) => {
  return res.status(200).json(res.locals);
});

router.get(
  "/completeCoin/:id",
  tiApiController.completeCoinMiddleware,
  (req, res) => {
    return res.status(200).json(res.locals.completeCoin);
  }
);

router.get(
  "/historyCoin/:id",
  tiApiController.historyCoinMiddleware,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

router.post("/logIn", userController.logIn, (req, res) => {
  res.status(200).json({ user: res.locals.user, token: res.locals.token });
});

router.post("/signup", userController.createUser, (req, res) => {
  res.status(200).json({ user: res.locals.user, token: res.locals.token });
});

/*router.post("/favCoin", coinController.favCoin, (req, res) => {
  res.status(200).json({ user: res.locals.user });
});

router.post("/displayFavCoins", coinController.displayFavCoins, (req, res) => {
  res.status(200).json({ user: res.locals.user });
});

router.post("/favCoin", coinController.favCoin, (req, res) => {
  res.status(200).json({ user: res.locals.user });
});

router.post("/displayFavCoins", coinController.displayFavCoins, (req, res) => {
  res.status(200).json({ user: res.locals.user });
});
*/

export default router;
