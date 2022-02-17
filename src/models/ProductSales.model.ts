import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { UsedCreditAmount } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Branches from './Branches.model';
import Products from './Products.model';
import Tenants from './Tenants.model';
import Users from './Users.model';

type Attributes = SequelizeTimeStamps & M.ProductSales;

type CreationAttributes = Partial<M.ProductSales>;

export default class ProductSales extends Model<Attributes, CreationAttributes> implements Attributes {
  productSaleId: number;
  branchId: number;
  productId: number;
  tenantId: number;
  userId: number;
  name: string;
  amount: number;
  price: number;
  usedCreditAmount: UsedCreditAmount;
  datetime: string;
  refundFlag: boolean;

  product?: M.Products;
  tenant?: M.Tenants;
  user?: M.Users;
  branch?: M.Branches;
}

ProductSales.init(
  {
    productSaleId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    productId: { type: DataTypes.INTEGER },
    tenantId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    amount: { type: DataTypes.INTEGER },
    price: { type: DataTypes.INTEGER },
    usedCreditAmount: { type: DataTypes.JSON },
    datetime: { type: DataTypes.STRING },
    refundFlag: { type: DataTypes.BOOLEAN },
  },
  { sequelize, tableName: 'ProductSales', timestamps: true },
);

export const associate = () => {
  ProductSales.belongsTo(Products, { as: 'product', foreignKey: 'productId' });
  ProductSales.belongsTo(Tenants, { as: 'tenant', foreignKey: 'tenantId' });
  ProductSales.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
  ProductSales.belongsTo(Branches, { as: 'branch', foreignKey: 'branchId' });
};
