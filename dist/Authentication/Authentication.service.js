"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Authentication_models_1 = require("./Authentication.models");
class UserService {
    async addUser(body) {
        try {
            const init_new_user = new Authentication_models_1.UserModel(body);
            const new_user = await init_new_user.save();
            return {
                status: 200, saved: true, message: null, user: new_user
            };
        }
        catch (error) {
            return {
                status: 500, saved: false, message: 'something went wrong! Try again.', user: null
            };
        }
    }
    async findUser(options) {
        try {
            if (options.id == undefined && options.email != undefined && options.at_provider_id == undefined) {
                const user = await Authentication_models_1.UserModel.findOne({ email: options.email });
                if (user == null)
                    return {
                        status: 404, found: false, message: "user doesn't exists!", user: null
                    };
                return {
                    status: 200, found: true, message: null, user: user
                };
            }
            else if (options.id != undefined && options.email == undefined && options.at_provider_id == undefined) {
                const user = await Authentication_models_1.UserModel.findById(options.id);
                if (user == null)
                    return {
                        status: 404, found: false, message: "user doesn't exists!", user: null
                    };
                return {
                    status: 200, found: true, message: null, user: user
                };
            }
            else if (options.id == undefined && options.email == undefined && options.at_provider_id != undefined) {
                const user = await Authentication_models_1.UserModel.findOne({ at_provider_id: options.at_provider_id });
                if (user == null)
                    return {
                        status: 404, found: false, message: "user doesn't exists!", user: null
                    };
                return {
                    status: 200, found: true, message: null, user: user
                };
            }
            else if (options.id == undefined && options.email == undefined && options.at_provider_id == undefined) {
                const users = await Authentication_models_1.UserModel.find();
                if (users == null)
                    return {
                        status: 404, found: false, message: "users doesn't exists!", user: null
                    };
                return {
                    status: 200, found: true, message: null, user: users
                };
            }
            else {
                return {
                    status: 404, found: false, message: 'something went wrong! Try again.', user: null
                };
            }
        }
        catch (error) {
            return {
                status: 500, found: false,
                message: 'something went wrong! Try again.', user: null
            };
        }
    }
    async deleteUser(user_id) {
        try {
            const user = await Authentication_models_1.UserModel.findById(user_id).remove();
            return { status: 200, deleted: true, message: 'user deleted successfully' };
        }
        catch (error) {
            return { status: 500, deleted: false, message: 'something went wrong! Try again.' };
        }
    }
    async updateUser(user_id, body) {
        try {
            const user = await Authentication_models_1.UserModel.findByIdAndUpdate(user_id, body, { new: true });
            return { status: 200, updated: true, message: 'user updated successfully!', user: user };
        }
        catch (error) {
            return {
                status: 500, updated: false, message: 'something went wrong! Try again.', user: null
            };
        }
    }
    async changePassword(id, password) {
        try {
            const user = await Authentication_models_1.UserModel.findByIdAndUpdate(id, { password: password });
            return {
                status: 200, changed: true, message: 'password changed successfully!'
            };
        }
        catch (error) {
            return { status: 500, changed: false, message: 'something went wrong! Try again.' };
        }
    }
}
exports.default = UserService;
