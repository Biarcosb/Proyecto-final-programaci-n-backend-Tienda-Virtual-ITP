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
exports.UserByIdSql = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class UserByIdSql {
    UserByIdSql(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `SELECT users.*, CONCAT_WS(' ', people.names, people.lastNames) as fullName
                  FROM users
                  inner join people on (people.userId = users.id)
                   where users.id = :userId`;
            try {
                const results = yield database_1.default.query(query, {
                    replacements: { userId },
                    type: sequelize_1.QueryTypes.SELECT,
                });
                return results;
            }
            catch (error) {
                console.error('Error ejecutando la consulta:', error);
                throw new Error('No se pudo obtener los detalles del curso.');
            }
        });
    }
}
exports.UserByIdSql = UserByIdSql;
//# sourceMappingURL=getDataByQuerySql.js.map