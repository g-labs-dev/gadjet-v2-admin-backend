import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';
import Contracts from './Contracts.model';
import ContractSpaces from './ContractSpaces.model';
import Images from './Images.model';
import SpaceTypes from './SpaceTypes.model';

type Attributes = SequelizeTimeStamps & M.Spaces;

type CreationAttributes = Partial<M.Spaces>;

export default class Spaces extends Model<Attributes, CreationAttributes> implements Attributes {
  spaceId: number;
  spaceTypeId: number;
  branchId: number;
  name: string;
  price: number;
  area: string;
  capacity: number;
  imageId: number | null;

  spaceType?: M.SpaceTypes;
  image?: M.Images;
  contractSpaces?: M.ContractSpaces[];
}

Spaces.init(
  {
    spaceId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    spaceTypeId: { type: DataTypes.INTEGER },
    branchId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    area: { type: DataTypes.STRING },
    capacity: { type: DataTypes.INTEGER },
    imageId: { type: DataTypes.INTEGER },
  },
  { sequelize, tableName: 'Spaces', timestamps: true },
);

export const associate = () => {
  Spaces.belongsTo(SpaceTypes, { as: 'spaceType', foreignKey: 'spaceTypeId' });
  Spaces.belongsTo(Images, { as: 'image', foreignKey: 'imageId' });

  Spaces.hasMany(ContractSpaces, { as: 'contractSpaces', foreignKey: 'spaceId' });
};
