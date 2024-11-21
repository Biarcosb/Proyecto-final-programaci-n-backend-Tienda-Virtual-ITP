import bcrypt from 'bcryptjs';
import { GetLoginSql } from '../infra/loginSql';
import { CreateUserSql } from '../infra/createUser';
import { CreatePeopleSql } from '../infra/createPeople';

export const registerUser = async (userData: { names: string; lastNames:string, email: string; password: string }) :Promise<any> => {
  const {
    names, lastNames, email, password,
  } = userData;

  // Verificar si el usuario ya existe
  const userSelect = new GetLoginSql();
  const existingUser = await userSelect.getLoginSql(email);
  console.log(existingUser, 'exist');
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  // Hashear la contraseña
  const hashedPassword = await bcrypt.hash(password, 10);
  interface CreateUser {
    user: {
      id?:number;
      email:string;
      password: string;
    },
    people: {
      userId?: number;
      names:string;
      lastNames: string;
    }
  }
  // Crear el usuario
  const createUser = new CreateUserSql();
  const createPeopleSql = new CreatePeopleSql();
  const dataUser : CreateUser = {
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
  const user = await createUser.createUserSql(dataUser.user);
  console.log(user, 'id user');
  dataUser.people.userId = user.dataValues.id;
  console.log(dataUser, 'ol');
  const people = await createPeopleSql.createPeopleSql(dataUser.people);
  console.log(people, 'people');
  const response = {
    userId: user.dataValues.id,
    peopleId: people.dataValues.id,
  };
  return response;
};
