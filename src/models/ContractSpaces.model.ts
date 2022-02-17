import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';
import Contracts from './Contracts.model';
import Spaces from './Spaces.model';

type Attributes = SequelizeTimeStamps & M.ContractSpaces;

type CreationAttributes = Partial<M.ContractSpaces>;

export default class ContractSpaces extends Model<Attributes, CreationAttributes> implements Attributes {
  contractSpaceId: number;
  contractId: number;
  spaceId: number;
  name: string;
  price: number;

  space?: M.Spaces;
  contract?: M.Contracts;
}

ContractSpaces.init(
  {
    contractSpaceId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contractId: { type: DataTypes.INTEGER },
    spaceId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, comment: '공간 계약 이름' },
    price: { type: DataTypes.INTEGER, comment: '공간 계약 비용' },
  },
  { sequelize, tableName: 'ContractSpaces', timestamps: true },
);

export const associate = () => {
  ContractSpaces.belongsTo(Spaces, { as: 'space', foreignKey: 'spaceId' });
  ContractSpaces.belongsTo(Contracts, { as: 'contract', foreignKey: 'contractId' });
};
