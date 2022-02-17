import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';
import Branches from './Branches.model';
import Spaces from './Spaces.model';

type Attributes = SequelizeTimeStamps & M.SpaceTypes;

type CreationAttributes = Partial<M.SpaceTypes>;

export default class SpaceTypes extends Model<Attributes, CreationAttributes> implements Attributes {
  spaceTypeId: number;
  branchId: number;
  name: string;
  virtualFlag: boolean;

  branch?: M.Branches;
  spaces?: M.Spaces[];
}

SpaceTypes.init(
  {
    spaceTypeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    virtualFlag: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  { sequelize, tableName: 'SpaceTypes', timestamps: true },
);

export const associate = () => {
  SpaceTypes.belongsTo(Branches, { as: 'branch', foreignKey: 'branchId' });

  SpaceTypes.hasMany(Spaces, { as: 'spaces', foreignKey: 'spaceTypeId' });
};
