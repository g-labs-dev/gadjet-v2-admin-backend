import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.Settlements;

type CreationAttributes = Partial<M.Settlements>;

export default class Settlements extends Model<Attributes, CreationAttributes> implements Attributes {
  settlementId: number;
  branchId: number;
  bankCode: string;
  bankName: string;
  account: string;
  holder: string;
  price: number;
  date: string;
  paymentJson: M.Payments[];
}

Settlements.init(
  {
    settlementId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    bankCode: { type: DataTypes.STRING },
    bankName: { type: DataTypes.STRING },
    account: { type: DataTypes.STRING },
    holder: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    date: { type: DataTypes.STRING },
    paymentJson: { type: DataTypes.JSON },
  },
  { sequelize, tableName: 'Settlements', timestamps: true },
);

export const associate = () => {
  // Settlements
};
