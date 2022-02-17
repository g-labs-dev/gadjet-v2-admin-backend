import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.UserNotifications;

type CreationAttributes = Partial<M.UserNotifications>;

export default class UserNotifications extends Model<Attributes, CreationAttributes> implements Attributes {
  userNotificationId: number;
  userId: number;
  title: string;
  content: string;
  link: string;
  readFlag: boolean;
  sendDatetime: string;
}

UserNotifications.init(
  {
    userNotificationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    link: { type: DataTypes.STRING },
    readFlag: { type: DataTypes.BOOLEAN },
    sendDatetime: { type: DataTypes.STRING },
  },
  { sequelize, tableName: 'UserNotifications', timestamps: true },
);

export const associate = () => {
  // UserNotifications
};
