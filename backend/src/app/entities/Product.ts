import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Market from '@app/entities/Market';
import Category from './Category';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'numeric', precision: 5, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  market_id: string;

  @ManyToOne(() => Market)
  @JoinColumn({ name: 'market_id' })
  market: Market;

  // @OneToMany(() => OrdersProducts, orderProducts => orderProducts.product, {
  //   cascade: true,
  //   eager: true,
  // })
  // order_products: OrdersProducts[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
