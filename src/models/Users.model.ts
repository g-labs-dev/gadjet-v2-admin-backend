import * as M from 'gadjet-v2-types/dist/model';
import { Device, UserStatus } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';

import { sequelize } from '@utils/sequelize';

import Images from './Images.model';
import TenantRoles from './TenantRoles.model';

type Attributes = SequelizeTimeStamps & M.Users;

type CreationAttributes = Partial<M.Users>;

export default class Users extends Model<Attributes, CreationAttributes> implements Attributes {
  userId: number;
  contact: string;
  legacyUserId: string;
  password: string;
  email: string;
  name: string;
  pushToken: string;
  profileImageId: number;
  code: string;
  status: UserStatus;
  device: null | Device;
  lastLogin: string;

  profile?: M.Images;
  tenantRoles?: M.TenantRoles[];
}

Users.init(
  {
    userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    contact: { type: DataTypes.STRING },
    legacyUserId: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    pushToken: { type: DataTypes.STRING },
    profileImageId: { type: DataTypes.INTEGER },
    code: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    device: { type: DataTypes.JSON },
    lastLogin: { type: DataTypes.STRING },
  },
  { sequelize, tableName: 'Users', timestamps: true },
);

export const associate = () => {
  Users.belongsTo(Images, { as: 'profile', foreignKey: 'profileImageId' });

  Users.hasMany(TenantRoles, { as: 'tenantRoles', foreignKey: 'userId' });
};
