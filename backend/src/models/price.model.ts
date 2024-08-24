import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import { Security } from './security.model';

@Table
export class Price extends Model {
  @Column
  date!: string;

  @Column
  close!: string;

  @Column
  volume!: string;

  @ForeignKey(() => Security)
  @Column
  securityId!: number;
}
