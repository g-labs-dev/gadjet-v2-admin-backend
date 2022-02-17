import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.RoleCodes;

type CreationAttributes = Partial<M.RoleCodes>;

export default class RoleCodes extends Model<Attributes, CreationAttributes> implements Attributes {
  code: string;
  hqId: number | null;
  branchId: number | null;
  to: string;
}

RoleCodes.init(
  {
    code: { type: DataTypes.STRING, primaryKey: true },
    hqId: { type: DataTypes.INTEGER },
    branchId: { type: DataTypes.INTEGER },
    to: { type: DataTypes.STRING },
  },
  { sequelize, tableName: 'RoleCodes', timestamps: true },
);

export const associate = () => {
  // RoleCodes
};
