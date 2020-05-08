import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'

export enum OperationType {
  DEBIT = 'DEBIT',
  CREDIT = 'CREDIT'
}
/// ColumnNumericTransformer
export class ColumnNumericTransformer {
  to (data: number): number {
    return data
  }

  from (data: string): number {
    return parseFloat(data)
  }
}

@Entity()
export class Operation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: OperationType, nullable: false })
  type: OperationType;

  @Column({ type: 'numeric', transformer: new ColumnNumericTransformer(), nullable: false })
  amount: number;

  @Column({ type: 'date', nullable: false })
  date: Date;

  @Column({ type: 'varchar', length: 150, nullable: false })
  description: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
