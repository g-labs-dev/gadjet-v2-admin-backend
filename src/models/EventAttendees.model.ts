import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { UsedCreditAmount } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Events from './Events.model';
import Users from './Users.model';

type Attributes = SequelizeTimeStamps & M.EventAttendees;

type CreationAttributes = Partial<M.EventAttendees>;

export default class EventAttendees extends Model<Attributes, CreationAttributes> implements Attributes {
  eventAttendeeId: number;
  eventId: number;
  userId: number;
  applyDatetime: string;
  usedCreditAmount: UsedCreditAmount;

  user?: M.Users;
  event?: M.Events;
}

EventAttendees.init(
  {
    eventAttendeeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    eventId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    applyDatetime: { type: DataTypes.STRING, comment: '참가 일시' },
    usedCreditAmount: { type: DataTypes.JSON, comment: '사용한 크레딧' },
  },
  { sequelize, tableName: 'EventAttendees', timestamps: true },
);

export const associate = () => {
  EventAttendees.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
  EventAttendees.belongsTo(Events, { as: 'event', foreignKey: 'eventId' });
};
