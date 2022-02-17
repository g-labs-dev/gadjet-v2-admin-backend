import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';
import Managers from './Managers.model';

type Attributes = SequelizeTimeStamps & M.AccessLogs;

type CreationAttributes = Partial<M.AccessLogs>;

export default class AccessLogs extends Model<Attributes, CreationAttributes> implements Attributes {
  accessLogId: number;
  hqId: number;
  branchId: number;
  managerId: number;
  managerName: string;
  title: string;
  url: string;
  ip: string;
  ua: string;
  successFlag: boolean;
  datetime: string;

  manager?: M.Managers;
}

AccessLogs.init(
  {
    accessLogId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hqId: { type: DataTypes.INTEGER },
    branchId: { type: DataTypes.INTEGER },
    managerId: { type: DataTypes.INTEGER, comment: '접근 매니저 아이디' },
    managerName: { type: DataTypes.STRING, comment: '접근 매니저 이름 ' },
    title: { type: DataTypes.STRING, comment: '접근 페이지 타이틀' },
    url: { type: DataTypes.STRING, comment: '접근 페이지 URL' },
    ip: { type: DataTypes.STRING },
    ua: { type: DataTypes.STRING },
    successFlag: { type: DataTypes.BOOLEAN, comment: '성공 여부' },
    datetime: { type: DataTypes.STRING, comment: 'YYYY-MM-DD HH:mm:ss' },
  },
  { sequelize, tableName: 'AccessLogs', timestamps: true },
);

export const associate = () => {
  AccessLogs.belongsTo(Managers, { as: 'manager', foreignKey: 'managerId' });
};
