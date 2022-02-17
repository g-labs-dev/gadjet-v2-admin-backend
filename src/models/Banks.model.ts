import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.Banks;

type CreationAttributes = Partial<M.Banks>;

export default class Banks extends Model<Attributes, CreationAttributes> implements Attributes {
  bankCode: string;
  name: string;
}

Banks.init(
  {
    bankCode: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
  },
  { sequelize, tableName: 'Banks', timestamps: true },
);

export const associate = () => {
  // Banks
};
