import People from '../models/peopleModel';

export class CreatePeopleSql {
  async createPeopleSql(data:Partial<People>) :Promise<People> {
    console.log(data, 'data');
    const user = await People.create(data);
    return user;
  }
}
