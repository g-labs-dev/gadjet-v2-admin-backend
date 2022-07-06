import * as M from 'gadjet-v2-types/dist/model';
import { Role } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';

import { sequelize } from '@utils/sequelize';

import Hqs from './Hqs.model';
import Managers from './Managers.model';

type Attributes = SequelizeTimeStamps & M.HqRoles;

type CreationAttributes = Partial<M.HqRoles>;

export default class HqRoles extends Model<Attributes, CreationAttributes> implements Attributes {
  hqRoleId: number;
  hqId: number;
  managerId: number;
  adminFlag: boolean;
  dashboard: Role;
  graph: Role;
  notice: Role;
  role: Role;
  config: Role;
  branch: Role;
  hq?: M.Hqs;
  manager?: M.Managers;
}

HqRoles.init(
  {
    hqRoleId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hqId: { type: DataTypes.INTEGER },
    managerId: { type: DataTypes.INTEGER },
    adminFlag: { type: DataTypes.BOOLEAN },
    dashboard: { type: DataTypes.INTEGER },
    graph: { type: DataTypes.INTEGER },
    notice: { type: DataTypes.INTEGER },
    role: { type: DataTypes.INTEGER },
    config: { type: DataTypes.INTEGER },
    branch: { type: DataTypes.INTEGER },
  },
  { sequelize, tableName: 'HqRoles', timestamps: true },
);

export const associate = () => {
  HqRoles.belongsTo(Hqs, { as: 'hq', foreignKey: 'hqId' });
  HqRoles.belongsTo(Managers, { as: 'manager', foreignKey: 'managerId' });
};
