"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputs = void 0;
const badRequest_1 = require("../errors/badRequest");
function validateInputs(inputs) {
    return (req, res, next) => {
        let missing = inputs;
        for (const input of inputs) {
            if (req.body[input]) {
                missing = missing.filter((entry) => entry != input);
            }
        }
        if (missing.length == 1) {
            return next(new badRequest_1.badRequest(`${missing[0]} should be provided`));
        }
        else if (missing.length > 1) {
            let comment = "";
            for (let i = 0; i < missing.length; i++) {
                if (i === missing.length - 1) {
                    comment = comment.concat(`and ${missing[i]}`);
                }
                else {
                    comment = comment.concat(`${missing[i]} ${i != missing.length - 2 ? "," : ""}`);
                }
            }
            return next(new badRequest_1.badRequest(`${comment} must be provided`).normalize());
        }
        next();
    };
}
exports.validateInputs = validateInputs;
