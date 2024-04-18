import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import userModel from "./models/user.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import getCategoryRoutes from "./routes/getCategoryRoutes.js";

const app = express();
const PORT = 8000;

dotenv.config();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODBURL)
  .then(() => {
    console.log("MongoDB Connected 👍");
  })
  .catch((err) => {
    console.log(`Oops Error occured while connecting to MongoDB . ${err}`);
  });

app.use(
  session({
    secret: process.env.SECRETKEY,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(userModel.authenticate()));

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRETKEY, // Replace with your own secret key
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    try {
      const user = await userModel.findById(payload.sub);

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/category", getCategoryRoutes);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
