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
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserSignedIn = void 0;
const notAuthorized_1 = require("../errors/notAuthorized");
const JWT_1 = require("../utils/JWT");
function checkUserSignedIn(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
            return next(new notAuthorized_1.notAuthorized("Please sign in to acess this route").normalize());
        }
        let { Email, id, Role } = JWT_1.JWT.verify(req.session.jwt);
        if (!Email || !id) {
            return next(new notAuthorized_1.notAuthorized("Please sign in to acess this route").normalize());
        }
        req.user = {
            Email,
            id,
            Role,
        };
        next();
    });
}
exports.checkUserSignedIn = checkUserSignedIn;
