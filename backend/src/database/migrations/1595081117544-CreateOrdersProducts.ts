// import { MigrationInterface, QueryRunner, Table } from 'typeorm';

// export default class CreateOrdersProducts1595081117544
//   implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.createTable(
//       new Table({
//         name: 'orders_products',
//         columns: [
//           {
//             name: 'id',
//             type: 'uuid',
//             isPrimary: true,
//             generationStrategy: 'uuid',
//             default: 'uuid_generate_v4()',
//           },
//           {
//             name: 'product_id',
//             type: 'uuid',
//             isNullable: true,
//           },
//           {
//             name: 'order_id',
//             type: 'uuid',
//             isNullable: true,
//           },
//           {
//             name: 'price',
//             type: 'numeric',
//             precision: 5,
//             scale: 2,
//           },
//           {
//             name: 'quantity',
//             type: 'int',
//           },
//           {
//             name: 'created_at',
//             type: 'timestamp',
//             default: 'now()',
//           },
//           {
//             name: 'updated_at',
//             type: 'timestamp',
//             default: 'now()',
//           },
//         ],
//         foreignKeys: [
//           {
//             name: 'OrdersProducts_Orders',
//             columnNames: ['order_id'],
//             referencedTableName: 'orders',
//             referencedColumnNames: ['id'],
//             onDelete: 'SET NULL',
//             onUpdate: 'CASCADE',
//           },
//           {
//             name: 'OrdersProducts_Products',
//             columnNames: ['product_id'],
//             referencedTableName: 'products',
//             referencedColumnNames: ['id'],
//             onDelete: 'SET NULL',
//             onUpdate: 'CASCADE',
//           },
//         ],
//       }),
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.dropForeignKey(
//       'orders_products',
//       'OrdersProducts_Orders',
//     );
//     await queryRunner.dropForeignKey(
//       'orders_products',
//       'OrdersProducts_Products',
//     );
//     await queryRunner.dropTable('orders_products');
//   }
// }
