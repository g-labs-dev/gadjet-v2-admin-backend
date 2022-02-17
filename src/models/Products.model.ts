import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { CreditType } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Images from './Images.model';

type Attributes = SequelizeTimeStamps & M.Products;

type CreationAttributes = Partial<M.Products>;

export default class Products extends Model<Attributes, CreationAttributes> implements Attributes {
  productId: number;
  branchId: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  salesAmount: number;
  availableCreditType: CreditType[];
  imageId: number | null;

  image?: M.Images;
}

Products.init(
  {
    productId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.TEXT },
    price: { type: DataTypes.INTEGER },
    stock: { type: DataTypes.INTEGER },
    salesAmount: { type: DataTypes.INTEGER },
    availableCreditType: { type: DataTypes.JSON },
    imageId: { type: DataTypes.INTEGER },
  },
  { sequelize, tableName: 'Products', timestamps: true },
);

export const associate = () => {
  Products.belongsTo(Images, { as: 'image', foreignKey: 'imageId' });
};
