import { DeletePeopleSql } from '../infra/deletePeopleSql';
import { DeleteUserSql } from '../infra/deleteUserSql';
// import {GetUserProfileSql} from '../infra/getUserProfileByUserIdSql'
export class DeleteUserProfile {
  async deleteUserProfile(userId: number): Promise<any> {
    console.log(userId, 'userId');
    const people = new DeletePeopleSql();
    await people.deletePeopleSql(userId);
    const user = new DeleteUserSql();
    const responseUser = await user.deleteUserSql(userId);
    return responseUser;
  }
}
