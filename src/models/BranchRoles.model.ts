import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { Role } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Branches from './Branches.model';
import Managers from './Managers.model';

type Attributes = SequelizeTimeStamps & M.BranchRoles;

type CreationAttributes = Partial<M.BranchRoles>;

export default class BranchRoles extends Model<Attributes, CreationAttributes> implements Attributes {
  branchRoleId: number;
  hqId: number;
  branchId: number;
  managerId: number;
  adminFlag: boolean;
  dashboard: Role;
  contract: Role;
  bill: Role;
  receipt: Role;
  space: Role;
  rental: Role;
  addition: Role;
  event: Role;
  tenant: Role;
  notice: Role;
  expenditure: Role;
  product: Role;
  service: Role;
  cash: Role;
  payment: Role;
  role: Role;
  accessLog: Role;
  config: Role;

  branch?: M.Branches;
  manager?: M.Managers;
}

BranchRoles.init(
  {
    branchRoleId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hqId: { type: DataTypes.INTEGER },
    branchId: { type: DataTypes.INTEGER },
    managerId: { type: DataTypes.INTEGER },
    adminFlag: { type: DataTypes.BOOLEAN, comment: '관리자 여부 / 지점 당 1명' },
    dashboard: { type: DataTypes.INTEGER, defaultValue: 1 },
    contract: { type: DataTypes.INTEGER, defaultValue: 1 },
    bill: { type: DataTypes.INTEGER, defaultValue: 1 },
    receipt: { type: DataTypes.INTEGER, defaultValue: 1 },
    space: { type: DataTypes.INTEGER, defaultValue: 1 },
    rental: { type: DataTypes.INTEGER, defaultValue: 1 },
    addition: { type: DataTypes.INTEGER, defaultValue: 1 },
    event: { type: DataTypes.INTEGER, defaultValue: 1 },
    tenant: { type: DataTypes.INTEGER, defaultValue: 1 },
    notice: { type: DataTypes.INTEGER, defaultValue: 1 },
    expenditure: { type: DataTypes.INTEGER, defaultValue: 1 },
    product: { type: DataTypes.INTEGER, defaultValue: 1 },
    service: { type: DataTypes.INTEGER, defaultValue: 1 },
    cash: { type: DataTypes.INTEGER, defaultValue: 1 },
    payment: { type: DataTypes.INTEGER, defaultValue: 1 },
    role: { type: DataTypes.INTEGER, defaultValue: 1 },
    accessLog: { type: DataTypes.INTEGER, defaultValue: 1 },
    config: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  { sequelize, tableName: 'BranchRoles', timestamps: true },
);

export const associate = () => {
  BranchRoles.belongsTo(Branches, { as: 'branch', foreignKey: 'branchId' });
  BranchRoles.belongsTo(Managers, { as: 'manager', foreignKey: 'managerId' });
};
