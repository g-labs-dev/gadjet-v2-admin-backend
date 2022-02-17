import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { ImageCategory } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.Images;

type CreationAttributes = Partial<M.Images>;

export default class Images extends Model<Attributes, CreationAttributes> implements Attributes {
  imageId: number;
  size: number;
  width: number;
  height: number;
  category: ImageCategory;
  path: string;
  uri: string;
}

Images.init(
  {
    imageId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    size: { type: DataTypes.INTEGER },
    width: { type: DataTypes.INTEGER },
    height: { type: DataTypes.INTEGER },
    category: { type: DataTypes.STRING },
    path: { type: DataTypes.TEXT },
    uri: { type: DataTypes.TEXT },
  },
  { sequelize, tableName: 'Images', timestamps: true },
);

export const associate = () => {
  // Images
};
