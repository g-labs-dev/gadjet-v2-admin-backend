import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.Floors;

type CreationAttributes = Partial<M.Floors>;

export default class Floors extends Model<Attributes, CreationAttributes> implements Attributes {
  floorId: number;
  branchId: number;
  name: string;
}

Floors.init(
  {
    floorId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
  },
  { sequelize, tableName: 'Floors', timestamps: true },
);

export const associate = () => {
  // Floors
};
