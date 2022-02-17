import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.TenantCards;

type CreationAttributes = Partial<M.TenantCards>;

export default class TenantCards extends Model<Attributes, CreationAttributes> implements Attributes {
  tenantCardId: number;
  tenantId: number;
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

TenantCards.init(
  {
    tenantCardId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    tenantId: { type: DataTypes.INTEGER },
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
  { sequelize, tableName: 'TenantCards', timestamps: true },
);

export const associate = () => {
  // TenantCards
};
