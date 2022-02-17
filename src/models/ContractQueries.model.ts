import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.ContractQueries;

type CreationAttributes = Partial<M.ContractQueries>;

export default class ContractQueries extends Model<Attributes, CreationAttributes> implements Attributes {
  contractQueryId: number;
  contractId: number;
  query: string;
}

ContractQueries.init(
  {
    contractQueryId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contractId: { type: DataTypes.INTEGER },
    query: { type: DataTypes.TEXT, comment: '검색어' },
  },
  { sequelize, tableName: 'ContractQueries', timestamps: true },
);

export const associate = () => {
  // ContractQueries
};
