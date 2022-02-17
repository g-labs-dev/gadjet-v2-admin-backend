import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';
import Branches from './Branches.model';
import HqRoles from './HqRoles.model';
import Images from './Images.model';

type Attributes = SequelizeTimeStamps & M.Hqs;

type CreationAttributes = Partial<M.Hqs>;

export default class Hqs extends Model<Attributes, CreationAttributes> implements Attributes {
  hqId: number;
  name: string;
  email: string;
  logoImageId: number | null;

  image?: M.Images;
  branches?: M.Branches[];
  roles?: M.HqRoles[];
}

Hqs.init(
  {
    hqId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    logoImageId: { type: DataTypes.INTEGER },
  },
  { sequelize, tableName: 'Hqs', timestamps: true },
);

export const associate = () => {
  Hqs.belongsTo(Images, { as: 'image', foreignKey: 'logoImageId' });

  Hqs.hasMany(Branches, { as: 'branches', foreignKey: 'hqId' });
  Hqs.hasMany(HqRoles, { as: 'roles', foreignKey: 'hqId' });
};
