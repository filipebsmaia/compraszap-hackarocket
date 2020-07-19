import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import Category from '@app/entities/Category';

export default class PopulateCategories1595115093228
  implements MigrationInterface {
  public async up(_queryRunner: QueryRunner): Promise<void> {
    const categoriesRepository = getRepository(Category, 'seeds');
    await categoriesRepository.save(
      categoriesRepository.create({ title: 'Alimetação', color: '#703bba' }),
    );
    await categoriesRepository.save(
      categoriesRepository.create({ title: 'Farmácia', color: '#a7ea07' }),
    );
    await categoriesRepository.save(
      categoriesRepository.create({ title: 'Serviços', color: '#8b224a' }),
    );
    await categoriesRepository.save(
      categoriesRepository.create({ title: 'Padaria', color: '#606b99' }),
    );
    await categoriesRepository.save(
      categoriesRepository.create({ title: 'Lanchonete', color: '#da6b44' }),
    );
    await categoriesRepository.save(
      categoriesRepository.create({ title: 'Veterinário', color: '#62a431' }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(_queryRunner: QueryRunner): Promise<void> {}
}
