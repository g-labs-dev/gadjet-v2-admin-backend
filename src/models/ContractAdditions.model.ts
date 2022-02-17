import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { Relation } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Additions from './Additions.model';
import Contracts from './Contracts.model';

type Attributes = SequelizeTimeStamps & M.ContractAdditions;

type CreationAttributes = Partial<M.ContractAdditions>;

export default class ContractAdditions extends Model<Attributes, CreationAttributes> implements Attributes {
  contractAdditionId: number;
  contractId: number;
  additionId: number;
  name: string;
  price: number;

  addition?: Relation<M.Additions>;
  contract?: Relation<M.Contracts>;
}

ContractAdditions.init(
  {
    contractAdditionId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contractId: { type: DataTypes.INTEGER, primaryKey: true },
    additionId: { type: DataTypes.INTEGER, primaryKey: true },
    name: { type: DataTypes.STRING, comment: '부가서비스 계약 이름' },
    price: { type: DataTypes.INTEGER, comment: '부가서비스 계약 비용' },
  },
  { sequelize, tableName: 'ContractAdditions', timestamps: true },
);

export const associate = () => {
  ContractAdditions.belongsTo(Additions, { as: 'addition', foreignKey: 'additionId' });
  ContractAdditions.belongsTo(Contracts, { as: 'contract', foreignKey: 'contractId' });
};
