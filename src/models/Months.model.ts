import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.Months;

type CreationAttributes = Partial<M.Months>;

export default class Months extends Model<Attributes, CreationAttributes> implements Attributes {
  yyyymm: number;
  year: number;
  month: number;
  monthString: string;
}

Months.init(
  {
    yyyymm: { type: DataTypes.INTEGER, primaryKey: true },
    year: { type: DataTypes.INTEGER },
    month: { type: DataTypes.INTEGER },
    monthString: { type: DataTypes.STRING },
  },
  { sequelize, tableName: 'Months', timestamps: true },
);

export const associate = () => {
  // Months
};
