import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { CreditType } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import CreditLogs from './CreditLogs.model';

type Attributes = SequelizeTimeStamps & M.Credits;

type CreationAttributes = Partial<M.Credits>;

export default class Credits extends Model<Attributes, CreationAttributes> implements Attributes {
  creditId: number;
  hqId: number;
  tenantId: number;
  contractId: number | null;
  userId: number;
  type: CreditType;
  amount: number;
  availableStartDate: string;
  availableEndDate: string;
  availableFlag: boolean;

  creditLogs?: Partial<M.CreditLogs>[];
}

Credits.init(
  {
    creditId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hqId: { type: DataTypes.INTEGER },
    tenantId: { type: DataTypes.INTEGER },
    contractId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING, comment: 'contract | buy | mileage' },
    amount: { type: DataTypes.INTEGER },
    availableStartDate: { type: DataTypes.STRING, comment: '유효기한 시작일 / type이 contract인 크레딧만 적용' },
    availableEndDate: { type: DataTypes.STRING, comment: '유효기한 종료일 / type이 contract인 크레딧만 적용' },
    availableFlag: { type: DataTypes.BOOLEAN, comment: '사용 가능 여부 / 매 일 00시 스케쥴' },
  },
  { sequelize, tableName: 'Credits', timestamps: true },
);

export const associate = () => {
  Credits.hasMany(CreditLogs, { as: 'creditLogs', foreignKey: 'creditId' });
};
