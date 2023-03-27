import mongoose from "mongoose";
interface userData {
    id: mongoose.Types.ObjectId;
    Email: string;
    Role: "Member" | "Admin";
}
export declare class JWT {
    static sign(userData: userData): Promise<string>;
    static verify(token: string): {
        Email: string;
        id: string;
        Role: "Member" | "Admin";
    };
}
export {};
