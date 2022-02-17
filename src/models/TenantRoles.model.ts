import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { Role } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Tenants from './Tenants.model';
import Users from './Users.model';

type Attributes = SequelizeTimeStamps & M.TenantRoles;

type CreationAttributes = Partial<M.TenantRoles>;

export default class TenantRoles extends Model<Attributes, CreationAttributes> implements Attributes {
  tenantRoleId: number;
  tenantId: number;
  userId: number;
  adminFlag: boolean;
  contract: Role;
  bill: Role;
  rental: Role;
  product: Role;
  service: Role;
  credit: Role;
  role: Role;

  tenant?: M.Tenants;
  user?: M.Users;
}

TenantRoles.init(
  {
    tenantRoleId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tenantId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    adminFlag: { type: DataTypes.BOOLEAN },
    contract: { type: DataTypes.INTEGER },
    bill: { type: DataTypes.INTEGER },
    rental: { type: DataTypes.INTEGER },
    product: { type: DataTypes.INTEGER },
    service: { type: DataTypes.INTEGER },
    credit: { type: DataTypes.INTEGER },
    role: { type: DataTypes.INTEGER },
  },
  { sequelize, tableName: 'TenantRoles', timestamps: true },
);

export const associate = () => {
  TenantRoles.belongsTo(Tenants, { as: 'tenant', foreignKey: 'tenantId' });
  TenantRoles.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
};
