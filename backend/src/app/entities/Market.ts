import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import Product from '@app/entities/Product';

@Entity('markets')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  whatsapp: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  uf: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  picture: string;

  @OneToMany(() => Product, product => product.market)
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'picture_url' })
  getPictureUrl(): string | null {
    if (!this.picture) {
      return `${process.env.APP_API_URL}/files/default-profile-photo`;
    }
    return `${process.env.APP_API_URL}/files/${this.picture}`;
  }
}

export default User;
