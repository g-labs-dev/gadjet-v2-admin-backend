import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { ContractDepositStatus } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Contracts from './Contracts.model';

type Attributes = SequelizeTimeStamps & M.ContractDeposits;

type CreationAttributes = Partial<M.ContractDeposits>;

export default class ContractDeposits extends Model<Attributes, CreationAttributes> implements Attributes {
  contractDepositId: number;
  branchId: number;
  contractId: number;
  price: number;
  bankCode: string;
  bankName: string;
  holder: string;
  account: string;
  status: ContractDepositStatus;

  contract?: M.Contracts;
}

ContractDeposits.init(
  {
    contractDepositId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    contractId: { type: DataTypes.INTEGER },
    price: { type: DataTypes.INTEGER, comment: '보증금 금액' },
    bankCode: { type: DataTypes.STRING, comment: '보증금 반환 은행코드' },
    bankName: { type: DataTypes.STRING, comment: '보증금 반환 은행이름' },
    holder: { type: DataTypes.STRING, comment: '보증금 반환 계좌 예금주' },
    account: { type: DataTypes.STRING, comment: '보증금 반환 계좌번호' },
    status: { type: DataTypes.STRING, comment: '보증금 상태 / unpaid | paid | returned' },
  },
  { sequelize, tableName: 'ContractDeposits', timestamps: true },
);

export const associate = () => {
  ContractDeposits.belongsTo(Contracts, { as: 'contract', foreignKey: 'contractId' });
};
