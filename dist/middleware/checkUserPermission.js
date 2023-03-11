"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserPermission = void 0;
const forbidden_1 = require("../errors/forbidden");
function checkUserPermission(roles) {
    return (req, res, next) => {
        for (const role of roles) {
            if (role === req.user.Role) {
                return next();
            }
        }
        return next(new forbidden_1.ForbiddenError("You are not authorized to access this route").normalize());
    };
}
exports.checkUserPermission = checkUserPermission;
