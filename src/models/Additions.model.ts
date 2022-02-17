import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { Relation } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import ContractAdditions from './ContractAdditions.model';

type Attributes = SequelizeTimeStamps & M.Additions;

type CreationAttributes = Partial<M.Additions>;

export default class Additions extends Model<Attributes, CreationAttributes> implements Attributes {
  additionId: number;
  branchId: number;
  name: string;
  price: number;

  contractAdditions?: Relation<M.ContractAdditions[]>;
}

Additions.init(
  {
    additionId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, comment: '이름' },
    price: { type: DataTypes.INTEGER, comment: '월 이용료' },
  },
  { sequelize, tableName: 'Additions', timestamps: true },
);

export const associate = () => {
  Additions.hasMany(ContractAdditions, { as: 'contractAdditions', foreignKey: 'additionId' });
};
