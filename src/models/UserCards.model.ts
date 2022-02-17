import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.UserCards;

type CreationAttributes = Partial<M.UserCards>;

export default class UserCards extends Model<Attributes, CreationAttributes> implements Attributes {
  userCardId: number;
  userId: number;
  billKey: string;
  cardCode: string;
  cardName: string;
  cardNumber: string;
  acquCardCode: string;
  acquCardName: string;
  registDate: string;
  corporationFlag: boolean;
  lastUsedFlag: boolean;
  billingFlag: boolean;
}

UserCards.init(
  {
    userCardId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER },
    billKey: { type: DataTypes.STRING },
    cardCode: { type: DataTypes.STRING },
    cardName: { type: DataTypes.STRING },
    cardNumber: { type: DataTypes.STRING },
    acquCardCode: { type: DataTypes.STRING },
    acquCardName: { type: DataTypes.STRING },
    registDate: { type: DataTypes.STRING },
    corporationFlag: { type: DataTypes.BOOLEAN },
    lastUsedFlag: { type: DataTypes.BOOLEAN },
    billingFlag: { type: DataTypes.BOOLEAN },
  },
  { sequelize, tableName: 'UserCards', timestamps: true },
);

export const associate = () => {
  // UserCards
};
