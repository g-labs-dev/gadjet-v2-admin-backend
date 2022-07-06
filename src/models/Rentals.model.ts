import * as M from 'gadjet-v2-types/dist/model';
import { CreditType } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';

import { sequelize } from '@utils/sequelize';

import Branches from './Branches.model';
import Images from './Images.model';
import RentalReservations from './RentalReservations.model';

type Attributes = SequelizeTimeStamps & M.Rentals;

type CreationAttributes = Partial<M.Rentals>;

export default class Rentals extends Model<Attributes, CreationAttributes> implements Attributes {
  rentalId: number;
  branchId: number;
  price: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  availableCreditType: CreditType[];
  weekendFlag: boolean;
  shareFlag: boolean;
  imageId: number | null;
  colorInfo: string;

  rentalReservations?: M.RentalReservations[];
  image?: M.Images;
  branch?: M.Branches;
}

Rentals.init(
  {
    rentalId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    price: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    startTime: { type: DataTypes.STRING },
    endTime: { type: DataTypes.STRING },
    availableCreditType: { type: DataTypes.JSON },
    weekendFlag: { type: DataTypes.BOOLEAN },
    shareFlag: { type: DataTypes.BOOLEAN },
    imageId: { type: DataTypes.INTEGER },
    colorInfo: { type: DataTypes.STRING },
  },
  { sequelize, tableName: 'Rentals', timestamps: true },
);

export const associate = () => {
  Rentals.hasMany(RentalReservations, { as: 'rentalReservations', foreignKey: 'rentalId' });
  Rentals.belongsTo(Branches, { as: 'branch', foreignKey: 'branchId' });
  Rentals.belongsTo(Images, { as: 'image', foreignKey: 'imageId' });
};
