import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { NicePayReserve, PaymentStatus, PaymentType } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Bills from './Bills.model';
import Users from './Users.model';

type Attributes = SequelizeTimeStamps & M.Payments;

type CreationAttributes = Partial<M.Payments>;

export default class Payments extends Model<Attributes, CreationAttributes> implements Attributes {
  paymentId: number;
  branchId: number;
  billId: number;
  userId: number;
  type: PaymentType;
  status: PaymentStatus;
  item: string;
  moid: string;
  readyDatetime: string;
  readyJson: { reserve: NicePayReserve; approveResponseData: ApproveResponseData } | null;
  approveDatetime: string;
  approveJson: ApproveResponseData | null;
  refundDatetime: string;
  refundJson: RefundResponseData | null;
  price: number;
  memo: string;
  c;
  commissionPrice: number;
  settlementPrice: number;
  gadjetPrice: number;
  manualFlag: boolean;
  confirmFlag: boolean;
  settlementFlag: boolean;
  legacyJson: any;

  bill?: M.Bills;
  user?: M.Users;
}

Payments.init(
  {
    paymentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    billId: { type: DataTypes.INTEGER },
    userId: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    item: { type: DataTypes.STRING },
    moid: { type: DataTypes.STRING, unique: true },
    readyDatetime: { type: DataTypes.STRING },
    readyJson: { type: DataTypes.JSON },
    approveDatetime: { type: DataTypes.STRING },
    approveJson: { type: DataTypes.JSON },
    refundDatetime: { type: DataTypes.STRING },
    refundJson: { type: DataTypes.JSON },
    price: { type: DataTypes.INTEGER },
    memo: { type: DataTypes.STRING },
    commissionPrice: { type: DataTypes.INTEGER },
    settlementPrice: { type: DataTypes.INTEGER },
    gadjetPrice: { type: DataTypes.INTEGER },
    manualFlag: { type: DataTypes.BOOLEAN },
    confirmFlag: { type: DataTypes.BOOLEAN },
    settlementFlag: { type: DataTypes.BOOLEAN },
    legacyJson: { type: DataTypes.JSON, comment: '데이터 이전용 컬럼' },
  },
  {
    sequelize,
    tableName: 'Payments',
    timestamps: true,
    hooks: {},
  },
);

export const associate = () => {
  Payments.belongsTo(Bills, { as: 'bill', foreignKey: 'billId' });
  Payments.belongsTo(Users, { as: 'user', foreignKey: 'userId' });
};
