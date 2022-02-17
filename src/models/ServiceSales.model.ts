import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { UsedCreditAmount } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Branches from './Branches.model';
import Services from './Services.model';
import Tenants from './Tenants.model';
import Users from './Users.model';

type Attributes = SequelizeTimeStamps & M.ServiceSales;

type CreationAttributes = Partial<M.ServiceSales>;

export default class ServiceSales extends Model<Attributes, CreationAttributes> implements Attributes {
  serviceSaleId: number;
  branchId: number;
  serviceId: number;
  tenantId: number;
  userId: number;
  name: string;
  amount: number;
  price: number;
  usedCreditAmount: UsedCreditAmount;
  datetime: string;
  refundFlag: boolean;

  service?: M.Services;
  tenant?: M.Tenants;
  user?: M.Users;
  branch?: M.Branches;
}

ServiceSales.init(
  {
    serviceSaleId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    serviceId: { type: DataTypes.INTEGER },
    tenantId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    amount: { type: DataTypes.INTEGER },
    price: { type: DataTypes.INTEGER },
    usedCreditAmount: { type: DataTypes.JSON },
    datetime: { type: DataTypes.STRING },
    refundFlag: { type: DataTypes.BOOLEAN },
  },
  { sequelize, tableName: 'ServiceSales', timestamps: true },
);

export const associate = () => {
  ServiceSales.belongsTo(Services, { as: 'service', foreignKey: 'serviceId' });
  ServiceSales.belongsTo(Tenants, { as: 'tenant', foreignKey: 'tenantId' });
  ServiceSales.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
  ServiceSales.belongsTo(Branches, { as: 'branch', foreignKey: 'branchId' });
};
