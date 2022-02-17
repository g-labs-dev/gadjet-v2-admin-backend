import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { BillType, BillPrice, ReceiptStatus } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Branches from './Branches.model';
import Contracts from './Contracts.model';
import Payments from './Payments.model';
import Receipts from './Receipts.model';
import Tenants from './Tenants.model';
import Users from './Users.model';

type Attributes = SequelizeTimeStamps & M.Bills;

type CreationAttributes = Partial<M.Bills>;

export default class Bills extends Model<Attributes, CreationAttributes> implements Attributes {
  billId: number;
  branchId: number;
  contractId: number;
  tenantId: number;
  userId: number | null;
  type: BillType;
  rate: number;
  price: number;
  unpaidPrice: number;
  openDate: string;
  startDate: string;
  endDate: string;
  paymentStartDate: string;
  paymentEndDate: string;
  lateFeeDate: string;
  spaces: BillPrice[];
  additions: BillPrice[];
  surcharges: BillPrice[];
  memo: string;
  receiptStatus: ReceiptStatus;
  gadjetPayFlag: boolean;
  manualFlag: boolean;

  branch?: M.Branches;
  contract?: M.Contracts;
  tenant?: M.Tenants;
  user?: M.Users;
  payments?: M.Payments[];
  receipts?: M.Receipts[];
}

Bills.init(
  {
    billId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    contractId: { type: DataTypes.INTEGER },
    tenantId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING, defaultValue: 'sales', comment: 'sales | deposit' },
    rate: { type: DataTypes.DOUBLE, defaultValue: 1, comment: '날짜 비율' },
    price: { type: DataTypes.INTEGER, comment: '청구서 결제금액' },
    unpaidPrice: { type: DataTypes.INTEGER, comment: '미납금액' },
    openDate: { type: DataTypes.STRING, comment: '입주사 청구서 조회 가능일자' },
    startDate: { type: DataTypes.STRING, comment: '제공기간 시작일' },
    endDate: { type: DataTypes.STRING, comment: '제공기간 종료일' },
    paymentStartDate: { type: DataTypes.STRING, comment: '결제예정 시작일 / YYYY-MM-DD' },
    paymentEndDate: { type: DataTypes.STRING, comment: '결제예정 종료일 / YYYY-MM-DD' },
    lateFeeDate: { type: DataTypes.STRING, comment: '연체료 부과 / YYYY-MM-DD' },
    spaces: { type: DataTypes.JSON, comment: '공간 이용료 / { name: string; price: number }[]]' },
    additions: { type: DataTypes.JSON, comment: '부가서비스 이용료 / { name: string; price: number }[]]' },
    surcharges: { type: DataTypes.JSON, comment: '기타 이용료 / { name: string; price: number }[]]' },
    memo: { type: DataTypes.STRING, comment: '청구서 메모', defaultValue: '' },
    receiptStatus: { type: DataTypes.STRING, comment: '증빙상태 / type ReceiptStatus' },
    gadjetPayFlag: { type: DataTypes.BOOLEAN, comment: '가젯결제 여부' },
    manualFlag: { type: DataTypes.BOOLEAN, defaultValue: 0, comment: '청구서 수동생성 여부 / ture일 경우 계약 업데이트 시 반영 안함' },
  },
  {
    sequelize,
    tableName: 'Bills',
    timestamps: true,
    hooks: {},
  },
);

export const associate = () => {
  Bills.belongsTo(Branches, { as: 'branch', foreignKey: 'branchId' });
  Bills.belongsTo(Contracts, { as: 'contract', foreignKey: 'contractId' });
  Bills.belongsTo(Tenants, { as: 'tenant', foreignKey: 'tenantId' });
  Bills.belongsTo(Users, { as: 'user', foreignKey: 'userId' });

  Bills.hasMany(Payments, { as: 'payments', foreignKey: 'billId' });
  Bills.hasMany(Receipts, { as: 'receipts', foreignKey: 'billId' });
};
