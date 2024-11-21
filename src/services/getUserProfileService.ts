import { UserByIdSql } from '../infra/getDataByQuerySql';
// import {GetUserProfileSql} from '../infra/getUserProfileByUserIdSql'
export class GetUserProfile {
  async getUserProfile(userId: number) :Promise<any> {
    console.log(userId, 'userId');
    const user = new UserByIdSql();
    const responseUser = await user.UserByIdSql(userId);
    if (!responseUser) {
      throw new Error('Usuario no encontrado');
    }
    return responseUser;
  }
}
