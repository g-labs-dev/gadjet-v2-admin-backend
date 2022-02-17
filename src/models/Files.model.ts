import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { FileCategory } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.Files;

type CreationAttributes = Partial<M.Files>;

export default class Files extends Model<Attributes, CreationAttributes> implements Attributes {
  fileId: number;
  size: number;
  category: FileCategory;
  path: string;
  uri: string;
}

Files.init(
  {
    fileId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    size: { type: DataTypes.INTEGER },
    category: { type: DataTypes.STRING },
    path: { type: DataTypes.TEXT },
    uri: { type: DataTypes.TEXT },
  },
  { sequelize, tableName: 'Files', timestamps: true },
);

export const associate = () => {
  // Files
};
