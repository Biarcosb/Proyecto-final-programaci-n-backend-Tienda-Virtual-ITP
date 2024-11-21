import { QueryTypes } from 'sequelize';
import sequelize from '../config/database';//

interface UserQueryResult {
  nombre: string;
}

export class UserByIdSql {
  async UserByIdSql(userId: number): Promise<UserQueryResult[]> {
    const query = `SELECT users.*, CONCAT_WS(' ', people.names, people.lastNames) as fullName
                  FROM users
                  inner join people on (people.userId = users.id)
                   where users.id = :userId`;
    try {
      const results: UserQueryResult[] = await sequelize.query(query, {
        replacements: { userId },
        type: QueryTypes.SELECT,
      });
      return results;
    } catch (error) {
      console.error('Error ejecutando la consulta:', error);
      throw new Error('No se pudo obtener los detalles del curso.');
    }
  }
}
