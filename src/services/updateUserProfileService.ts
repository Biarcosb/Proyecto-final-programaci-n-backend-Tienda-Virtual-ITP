import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { GetUserProfileSql } from '../infra/getUserProfileByUserIdSql';
import { UpdateUserSql } from '../infra/updateUser';
import { UpdatePeopleSql } from '../infra/updatePeople';

dotenv.config();

export const updateUserProfile = async (userId: number, updateData: Partial<{ names: string; email: string; password: string }>):Promise<any> => {
  const user = new GetUserProfileSql();
  const userResponse = await user.getUserProfileSql(userId);
  console.log(userResponse, 'ur');
  if (!userResponse) {
    throw new Error('Usuario no encontrado');
  }
  interface UpdateUser {
    user: {
      id?:number;
      email?:string;
      password?: string;
    },
    people: {
      userId?: number;
      names?: string;
      lastNames?: string;
    }
  }
  const { names, email, password } = updateData;
  let passwordFormat = '';
  if (password) {
    passwordFormat = await bcrypt.hash(password, 10);
  }

  const data : UpdateUser = {
    user: {
      email,
      password: passwordFormat,
    },
    people: {
      userId,
      names,
    },
  };
  const updateUserData = new UpdateUserSql();
  const updatePeopleData = new UpdatePeopleSql();
  const updateUser = await updateUserData.updateUserSql(data.user, userId);
  await updatePeopleData.updatePeopleSql(data.people, userId);
  return updateUser;
};
