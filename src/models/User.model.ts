import mongoose, { Document, Model, Schema, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import { toJSON, paginate } from "./plugins";
import { IUserGeneral } from "./UserGeneral.model";
import { IUserResource } from "./UserResource.model";

export interface IUser extends Document {
  email: string;
  password: string;
  user_name: string | null;
  status: boolean;
  sso_type: string;
  user_type: string;
  google_id: string | null;
  apple_id: string | null;
  facebook_id: string | null;
  isPasswordMatch: (password: string) => Promise<boolean>;
}

interface UserModel extends Model<IUser> {
  isEmailTaken: (email: string, excludeUserId?: string) => Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      private: true, // used by the toJSON plugin
    },
    user_name: {
      type: String,
      required: false,
      trim: true,
      default: "",
    },
    status: {
      type: Boolean, // Corrected to Boolean
      required: true,
      default: true,
    },
    user_type: {
      type: String,
      required: true,
      default: "user",
    },
    sso_type: {
      type: String,
      default: "register", //register, google, facebook, apple
    },
    google_id: {
      type: String,
      default: "",
    },
    facebook_id: {
      type: String,
      default: "",
    },
    apple_id: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.statics.isEmailTaken = async function (
  email: string,
  excludeUserId?: string
) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

// userSchema.statics.isUsernameTaken = async function (
//   user_name: string,
//   excludeUserId?: string
// ) {
//   const user = await this.findOne({ user_name, _id: { $ne: excludeUserId } });
//   return !!user;
// };

userSchema.methods.isPasswordMatch = async function (password: string) {
  const user = this as IUser;
  return bcrypt.compare(password, user.password);
};

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
