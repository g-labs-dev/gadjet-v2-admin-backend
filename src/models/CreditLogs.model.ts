import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { CreditType, CreditUsage } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Credits from './Credits.model';

type Attributes = SequelizeTimeStamps & M.CreditLogs;

type CreationAttributes = Partial<M.CreditLogs>;

export default class CreditLogs extends Model<Attributes, CreationAttributes> implements Attributes {
  creditLogId: number;
  creditId: number;
  creditType: CreditType;
  usage: CreditUsage | null;
  amount: number;
  datetime: string;
  memo: string;

  credit?: M.Credits;
}

CreditLogs.init(
  {
    creditLogId: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    creditId: { type: DataTypes.INTEGER },
    creditType: { type: DataTypes.STRING },
    usage: { type: DataTypes.STRING, comment: 'rental | store | service | event | purchase' },
    amount: { type: DataTypes.INTEGER, comment: '변화량' },
    datetime: { type: DataTypes.STRING, comment: 'YYYY-MM-DD HH:mm:ss' },
    memo: { type: DataTypes.STRING },
  },
  { sequelize, tableName: 'CreditLogs', timestamps: true },
);

export const associate = () => {
  CreditLogs.belongsTo(Credits, { as: 'credit', foreignKey: 'creditId' });
};
