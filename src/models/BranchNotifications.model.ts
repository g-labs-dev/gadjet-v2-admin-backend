import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.BranchNotifications;

type CreationAttributes = Partial<M.BranchNotifications>;

export default class BranchNotifications extends Model<Attributes, CreationAttributes> implements Attributes {
  branchNotificationId: number;
  branchId: number;
  title: string;
  content: string;
  sendDatetime: string;
  link: string;
}

BranchNotifications.init(
  {
    branchNotificationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING, comment: '제목' },
    content: { type: DataTypes.STRING, comment: '내용' },
    sendDatetime: { type: DataTypes.STRING, comment: '발송일시 / YYYY-MM-DD HH:mm:ss' },
    link: { type: DataTypes.STRING, comment: '푸시알림 클릭 시 링크' },
  },
  { sequelize, tableName: 'BranchNotifications', timestamps: true },
);

export const associate = () => {
  // BranchNotifications
};
