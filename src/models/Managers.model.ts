import * as M from 'gadjet-v2-types/dist/model';
import { ManagerJoinType, ManagerStatus } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';

import { sequelize } from '@utils/sequelize';

import BranchRoles from './BranchRoles.model';
import HqRoles from './HqRoles.model';
import Images from './Images.model';

type Attributes = SequelizeTimeStamps & M.Managers;

type CreationAttributes = Partial<M.Managers>;

export default class Managers extends Model<Attributes, CreationAttributes> implements Attributes {
  managerId: number;
  email: string;
  legacyManagerId: string;
  password: string;
  name: string;
  joinType: ManagerJoinType;
  socialId: string;
  pushToken: string | null;
  profileImageId: number | null;
  lastLogin: string;
  resetCode: string;
  status: ManagerStatus;

  profile?: M.Images;
  branchRoles?: M.BranchRoles[];
  hqRoles?: M.HqRoles[];
}

Managers.init(
  {
    managerId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING },
    legacyManagerId: { type: DataTypes.STRING, comment: '가젯v1 아이디' },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    joinType: { type: DataTypes.STRING, comment: '회원가입 방식 / local | google' },
    socialId: { type: DataTypes.STRING, comment: 'social id' },
    pushToken: { type: DataTypes.STRING, comment: 'FCM token' },
    profileImageId: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING },
    lastLogin: { type: DataTypes.STRING },
    resetCode: { type: DataTypes.STRING },
  },
  { sequelize, tableName: 'Managers', timestamps: true },
);

export const associate = () => {
  Managers.belongsTo(Images, { as: 'profile', foreignKey: 'profileImageId' });

  Managers.hasMany(BranchRoles, { as: 'branchRoles', foreignKey: 'managerId' });
  Managers.hasMany(HqRoles, { as: 'hqRoles', foreignKey: 'managerId' });
};
