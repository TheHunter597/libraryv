import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { promisify } from "util";
interface userData {
  id: mongoose.Types.ObjectId;
  Email: string;
  Role: "Member" | "Admin";
}

export class JWT {
  static async sign(userData: userData) {
    try {
      let token = (await promisify(jwt.sign)(
        userData,
        process.env["jwt-secret"] as string
      )) as string;
      return token;
    } catch (err) {
      console.log(err);
      throw new Error("error while creating token");
    }
  }
  static verify(token: string) {
    let { Email, id, Role } = jwt.verify(
      token,
      process.env["jwt-secret"] as string
    ) as {
      Email: string;
      id: mongoose.Types.ObjectId;
      Role: "Member" | "Admin";
    };

    return { Email, id, Role };
  }
}
