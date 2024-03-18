import express, { Request, Response } from "express";
import session from "express-session";
const crypto = require("crypto");
import ApiError from "./utils/ApiError";
import httpStatus from "http-status";
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import compression from "compression";
import cors from "cors";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { jwtStrategy } from "./config/passport";
import { errorConverter, errorHandler } from "./middlewares/error";
import { fileParser } from "express-multipart-file-parser";
import routes from "./routes/v1";
import User from "./models/User.model";
var cookieParser = require("cookie-parser");
import { generateAuthTokens } from "./services/token.service";
import {
  createUserArmy,
  createUserCity,
  createUserDefense,
  createUserGeneral,
  createUserResource,
  getUserById,
} from "./services/user.service";

const app = express();

// Middleware
app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add express-session middleware
app.use(
  session({
    secret: "flustered", // Set your own secret key
    resave: false,
    secure: false,
    saveUninitialized: false,
  })
);

app.use(
  fileParser({
    rawBodyOptions: { limit: "30mb" },
    busboyOptions: { limits: { fields: 50 } },
  })
);
app.use(xss());
app.use(mongoSanitize());
app.use(compression());
app.use(cors());
app.options("*", cors());

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());
passport.use("jwt", jwtStrategy);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails && profile.emails[0].value;
      const uid = profile.id;
      const signupThrough = "google";
      try {
        let user = await User.findOne({ email }).select("-password");

        if (!user) {
          user = new User({
            email: email,
            password: crypto.randomBytes(8).toString("hex"), // Generate random password
            sso_type: signupThrough,
            google_id: uid,
          });

          user = await user.save();
        }
        return done(null, { user });
      } catch (error) {
        return done(error);
      }
    }
  )
);

// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user
passport.deserializeUser(async (user, done) => {
  try {
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req: Request, res: Response) => {
    const { user }: any = req;
    const authUser = user.user;

    // Create user general
    await createUserGeneral(authUser._id);

    // Create user resources
    await createUserResource(authUser._id);

    // Create user armies
    await createUserArmy(authUser._id);

    // Create user defenses
    await createUserDefense(user._id);

    // Create user city
    await createUserCity(user._id);

    // Generate authentication token
    const token = await generateAuthTokens(authUser);

    // Get authenticated user data
    const userData = await getUserById(authUser._id);

    // Send response
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      message: "login successful",
      user: userData,
      token,
    });
  }
);

// API Routes
app.use("/api/v1", routes);

// send back a 404 error for any unknown api request
app.use((req: any, res: any, next: any) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// Convert error to ApiError, if needed
app.use(errorConverter);

// Handle errors
app.use(errorHandler);

export { app };
