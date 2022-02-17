import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.BranchAutomations;

type CreationAttributes = Partial<M.BranchAutomations>;

export default class BranchAutomations extends Model<Attributes, CreationAttributes> implements Attributes {
  branchAutomationId: number;
  branchId: number;
  billing: boolean;
  receipt: boolean;
}

BranchAutomations.init(
  {
    branchAutomationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    billing: { type: DataTypes.BOOLEAN, defaultValue: 1, comment: '청구서 자동발행 여부' },
    receipt: { type: DataTypes.BOOLEAN, defaultValue: 1, comment: '증빙 자동발행 여부' },
  },
  { sequelize, tableName: 'BranchAutomations', timestamps: true },
);

export const associate = () => {
  // BranchAutomations
};
