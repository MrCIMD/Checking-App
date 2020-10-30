// Lib
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
// Entity
import { User } from './../../../entities/user.entity';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { name: 'Juan Perez', email: 'jperez@gmail.com', password: "NOT-FOUND" },
      ])
      .execute()
  }
}