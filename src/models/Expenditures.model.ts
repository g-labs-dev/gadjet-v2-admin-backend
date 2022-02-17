import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { ExpenditureType } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Managers from './Managers.model';

type Attributes = SequelizeTimeStamps & M.Expenditures;

type CreationAttributes = Partial<M.Expenditures>;

export default class Expenditures extends Model<Attributes, CreationAttributes> implements Attributes {
  expenditureId: number;
  branchId: number;
  managerId: number | null;
  managerName: string;
  date: string;
  type: ExpenditureType;
  price: number;
  memo: string;

  manager?: M.Managers;
}

Expenditures.init(
  {
    expenditureId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    managerId: { type: DataTypes.INTEGER },
    managerName: { type: DataTypes.STRING },
    date: { type: DataTypes.STRING, comment: '날짜 / YYYY-MM-DD' },
    type: { type: DataTypes.STRING, comment: '지출 타입 / card | tranfer | cash' },
    price: { type: DataTypes.INTEGER, comment: '비용' },
    memo: { type: DataTypes.STRING, comment: '메모' },
  },
  { sequelize, tableName: 'Expenditures', timestamps: true },
);

export const associate = () => {
  Expenditures.belongsTo(Managers, { as: 'manager', foreignKey: 'managerId' });
};
