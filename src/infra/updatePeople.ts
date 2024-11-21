import People from '../models/peopleModel';

export class UpdatePeopleSql {
  async updatePeopleSql(data:Partial<People>, userId:number) :Promise<[number, People[]]> {
    console.log(data, 'data');
    const user = await People.update(data, {
      where: { id: userId },
      returning: true, // Esto nos devolverá la persona del usuario está actualizado
    });
    return user;
  }
}
