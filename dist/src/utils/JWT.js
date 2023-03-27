"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const util_1 = require("util");
class JWT {
    static sign(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let token = (yield (0, util_1.promisify)(jsonwebtoken_1.default.sign)(userData, process.env["jwt-secret"]));
                return token;
            }
            catch (err) {
                console.log({ err });
                throw new Error("error while creating token");
            }
        });
    }
    static verify(token) {
        console.log({ token });
        let { Email, id, Role } = jsonwebtoken_1.default.verify(token, process.env["jwt-secret"]);
        return { Email, id, Role };
    }
}
exports.JWT = JWT;
