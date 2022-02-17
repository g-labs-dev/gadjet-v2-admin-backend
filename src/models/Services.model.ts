import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { CreditType } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Images from './Images.model';

type Attributes = SequelizeTimeStamps & M.Services;

type CreationAttributes = Partial<M.Services>;

export default class Services extends Model<Attributes, CreationAttributes> implements Attributes {
  serviceId: number;
  branchId: number;
  name: string;
  description: string;
  price: number;
  guide: string;
  salesAmount: number;
  availableCreditType: CreditType[];
  imageId: number | null;

  image?: M.Images;
}

Services.init(
  {
    serviceId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.INTEGER },
    guide: { type: DataTypes.TEXT },
    salesAmount: { type: DataTypes.INTEGER },
    availableCreditType: { type: DataTypes.JSON },
    imageId: { type: DataTypes.INTEGER },
  },
  { sequelize, tableName: 'Services', timestamps: true },
);

export const associate = () => {
  Services.belongsTo(Images, { as: 'image', foreignKey: 'imageId' });
};
