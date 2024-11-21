"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const userModel_1 = __importDefault(require("./userModel"));
class People extends sequelize_1.Model {
}
People.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
            model: userModel_1.default,
            key: 'id',
        },
    },
    names: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastNames: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'people',
    sequelize: database_1.default,
    timestamps: true,
});
exports.default = People;
//# sourceMappingURL=peopleModel.js.map