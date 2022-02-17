import Managers from '@models/Managers.model';
import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.Cash;

type CreationAttributes = Partial<M.Cash>;

export default class Cash extends Model<Attributes, CreationAttributes> implements Attributes {
  cashId: number;
  branchId: number;
  managerId: number | null;
  managerName: string;
  date: string;
  price: number;
  memo: string;
  reserve: number;

  manager?: M.Managers;
}

Cash.init(
  {
    cashId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    managerId: { type: DataTypes.INTEGER, comment: '입력한 매니저 아이디' },
    managerName: { type: DataTypes.STRING, comment: '입력한 매니저 이름' },
    date: { type: DataTypes.STRING, comment: '날짜 / YYYY-MM-DD' },
    price: { type: DataTypes.INTEGER },
    memo: { type: DataTypes.STRING, comment: '메모' },
    reserve: { type: DataTypes.INTEGER, comment: '잔액' },
  },
  {
    sequelize,
    tableName: 'Cash',
    timestamps: true,
    hooks: {},
  },
);

export const associate = () => {
  Cash.belongsTo(Managers, { as: 'manager', foreignKey: 'managerId' });
};
