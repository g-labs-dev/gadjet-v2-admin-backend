import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.Gics;

type CreationAttributes = Partial<M.Gics>;

export default class Gics extends Model<Attributes, CreationAttributes> implements Attributes {
  code: number;
  parentCode: number;
  depth: number;
  ko: string;
  en: string;

  children?: M.Gics[];
}

Gics.init(
  {
    code: { type: DataTypes.INTEGER, primaryKey: true },
    parentCode: { type: DataTypes.INTEGER },
    depth: { type: DataTypes.INTEGER },
    ko: { type: DataTypes.STRING },
    en: { type: DataTypes.STRING },
  },
  { sequelize, tableName: 'Gics', timestamps: true },
);

export const associate = () => {
  Gics.hasMany(Gics, { as: 'children', foreignKey: 'parentCode' });
};
