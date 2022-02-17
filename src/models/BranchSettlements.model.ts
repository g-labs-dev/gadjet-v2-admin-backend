import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';
import Banks from './Banks.model';

type Attributes = SequelizeTimeStamps & M.BranchSettlements;

type CreationAttributes = Partial<M.BranchSettlements>;

export default class BranchSettlements extends Model<Attributes, CreationAttributes> implements Attributes {
  branchSettlementId: number;
  branchId: number;
  bankCode: string;
  bankName: string;
  account: string;
  holder: string;

  bank?: M.Banks;
}

BranchSettlements.init(
  {
    branchSettlementId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    bankCode: { type: DataTypes.STRING, comment: '정산받을 은행 코드' },
    bankName: { type: DataTypes.STRING, comment: '정산받을 은행 이름' },
    account: { type: DataTypes.STRING, comment: '정산받을 계좌번호' },
    holder: { type: DataTypes.STRING, comment: '정산받을 계좌 예금주' },
  },
  { sequelize, tableName: 'BranchSettlements', timestamps: true },
);

export const associate = () => {
  BranchSettlements.belongsTo(Banks, { as: 'bank' });
};
