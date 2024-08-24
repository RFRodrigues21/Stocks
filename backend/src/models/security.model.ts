import { Table, Column, Model, HasMany } from 'sequelize-typescript';
import { Price } from './price.model';

@Table
export class Security extends Model {
  @Column
  ticker!: string;

  @Column
  securityName!: string;

  @Column
  sector!: string;

  @Column
  country!: string;

  @Column({ type: 'FLOAT' })
  trend!: number;

  @HasMany(() => Price)
  prices!: Price[];
}
