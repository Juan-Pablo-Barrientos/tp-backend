import express from "express";
import categoriesRouter from "./categoriesRouter";
import pollValuesRouter from "./poll_valuesRouter";
import pollsRouter from "./pollsRouter";
import postsRouter from "./postsRouter";
import provincesRouter from "./provincesRouter";
import subscriptionPricesRouter from "./subscription_pricesRouter";
import userVotesRouter from "./user_votesRouter";
import userRouter from "./userRouter";
import cityRouter from "./cityRouter"
import weatherRouter from "./Navigation/Index"
import { authenticateJWT } from "../middlewares/authenticateJWT.middleware";

const router = express.Router();

router.use("/users", userRouter);

router.use(authenticateJWT);
router.use("/categories", categoriesRouter);
router.use("/poll_values", pollValuesRouter);
router.use("/polls", pollsRouter);
router.use("/posts", postsRouter);
router.use("/provinces", provincesRouter);
router.use("/subscription_prices", subscriptionPricesRouter);
router.use("/user_votes", userVotesRouter);
router.use("/city", cityRouter)
router.use("/weather", weatherRouter)

export default router;
