import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { TenantType, CreditUsage } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Contracts from './Contracts.model';
import Credits from './Credits.model';
import Gics from './Gics.model';
import TenantRoles from './TenantRoles.model';
import Users from './Users.model';

type Attributes = SequelizeTimeStamps & M.Tenants;

type CreationAttributes = Partial<M.Tenants>;

export default class Tenants extends Model<Attributes, CreationAttributes> implements Attributes {
  tenantId: number;
  name: string;
  contact: string;
  email: string;
  businessNumber: string;
  corporationNumber: string;
  foreignerNumber: string;
  gicsCode: number;
  type: TenantType;
  availableCreditUsage: CreditUsage[];

  credits?: M.Credits;
  gics?: M.Gics;
  users?: M.Users[];
  contracts?: M.Contracts[];
}

Tenants.init(
  {
    tenantId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    contact: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    businessNumber: { type: DataTypes.STRING },
    corporationNumber: { type: DataTypes.STRING },
    foreignerNumber: { type: DataTypes.STRING },
    gicsCode: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING },
    availableCreditUsage: { type: DataTypes.JSON },
  },
  { sequelize, tableName: 'Tenants', timestamps: true },
);

export const associate = () => {
  Tenants.hasMany(Credits, { as: 'credits', foreignKey: 'tenantId' });
  Tenants.hasMany(Contracts, { as: 'contracts', foreignKey: 'tenantId' });

  Tenants.belongsTo(Gics, { as: 'gics', foreignKey: 'gicsCode' });

  Tenants.belongsToMany(Users, { as: 'users', foreignKey: 'tenantId', otherKey: 'userId', through: TenantRoles });
};
