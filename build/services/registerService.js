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
exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const loginSql_1 = require("../infra/loginSql");
const createUser_1 = require("../infra/createUser");
const createPeople_1 = require("../infra/createPeople");
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { names, lastNames, email, password, } = userData;
    const userSelect = new loginSql_1.GetLoginSql();
    const existingUser = yield userSelect.getLoginSql(email);
    console.log(existingUser, 'exist');
    if (existingUser) {
        throw new Error('El usuario ya existe');
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const createUser = new createUser_1.CreateUserSql();
    const createPeopleSql = new createPeople_1.CreatePeopleSql();
    const dataUser = {
        user: {
            email,
            password: hashedPassword,
        },
        people: {
            userId: null,
            names,
            lastNames,
        },
    };
    console.log(dataUser, 'data user');
    const user = yield createUser.createUserSql(dataUser.user);
    console.log(user, 'id user');
    dataUser.people.userId = user.dataValues.id;
    console.log(dataUser, 'ol');
    const people = yield createPeopleSql.createPeopleSql(dataUser.people);
    console.log(people, 'people');
    const response = {
        userId: user.dataValues.id,
        peopleId: people.dataValues.id,
    };
    return response;
});
exports.registerUser = registerUser;
//# sourceMappingURL=registerService.js.map