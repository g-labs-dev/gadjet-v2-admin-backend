import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { UsedCreditAmount } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Branches from './Branches.model';
import Rentals from './Rentals.model';
import Tenants from './Tenants.model';
import Users from './Users.model';

type Attributes = SequelizeTimeStamps & M.RentalReservations;

type CreationAttributes = Partial<M.RentalReservations>;

export default class RentalReservations extends Model<Attributes, CreationAttributes> implements Attributes {
  rentalReservationId: number;
  branchId: number;
  rentalId: number;
  tenantId: number;
  userId: number;
  date: string;
  startTime: string;
  endTime: string;
  memo: string;
  usedCreditAmount: UsedCreditAmount;
  managerFlag: boolean;

  branch?: M.Branches;
  rental?: M.Rentals;
  tenant?: M.Tenants;
  user?: M.Users;
}

RentalReservations.init(
  {
    rentalReservationId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    rentalId: { type: DataTypes.INTEGER },
    tenantId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    date: { type: DataTypes.STRING },
    startTime: { type: DataTypes.STRING },
    endTime: { type: DataTypes.STRING },
    memo: { type: DataTypes.STRING },
    usedCreditAmount: { type: DataTypes.JSON },
    managerFlag: { type: DataTypes.BOOLEAN },
  },
  { sequelize, tableName: 'RentalReservations', timestamps: true },
);

export const associate = () => {
  RentalReservations.belongsTo(Branches, { as: 'branch', foreignKey: 'branchId' });
  RentalReservations.belongsTo(Rentals, { as: 'rental', foreignKey: 'rentalId' });
  RentalReservations.belongsTo(Tenants, { as: 'tenant', foreignKey: 'tenantId' });
  RentalReservations.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
};
