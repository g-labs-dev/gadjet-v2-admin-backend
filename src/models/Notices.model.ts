import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';
import Branches from './Branches.model';
import Hqs from './Hqs.model';

type Attributes = SequelizeTimeStamps & M.Notices;

type CreationAttributes = Partial<M.Notices>;

export default class Notices extends Model<Attributes, CreationAttributes> implements Attributes {
  noticeId: number;
  hqId: number;
  branchId: number;
  title: string;
  content: string;
  writeDate: string;
  openFlag: boolean;

  hq?: M.Hqs;
  branch?: M.Branches;
}

Notices.init(
  {
    noticeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hqId: { type: DataTypes.INTEGER },
    branchId: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.TEXT },
    writeDate: { type: DataTypes.STRING },
    openFlag: { type: DataTypes.BOOLEAN },
  },
  { sequelize, tableName: 'Notices', timestamps: true },
);

export const associate = () => {
  Notices.belongsTo(Hqs, { as: 'hq', foreignKey: 'hqId' });
  Notices.belongsTo(Branches, { as: 'branch', foreignKey: 'branchId' });
};
