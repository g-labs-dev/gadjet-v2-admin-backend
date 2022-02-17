import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { Cashbill } from 'gadjet-v2-types/dist/popbill/cash-bill';
import { TaxInvoice, TaxInvoiceInvoicee, TaxInvoiceInvoicer } from 'gadjet-v2-types/dist/popbill/tax-invoice';
import { ReceiptType, ReceiptStatus } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Bills from './Bills.model';

type Attributes = SequelizeTimeStamps & M.Receipts;

type CreationAttributes = Partial<M.Receipts>;

export default class Receipts extends Model<Attributes, CreationAttributes> implements Attributes {
  receiptId: number;
  parentReceiptId: number;
  branchId: number;
  billId: number;
  type: ReceiptType;
  status: ReceiptStatus;
  price: number;
  ntsConfirmNumber: string;
  ntsResultCode: string;
  mgtKey: string;
  requestDatetime: string;
  taxInvoiceJson: TaxInvoice;
  cashBillJson: Cashbill;
}

Receipts.init(
  {
    receiptId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    parentReceiptId: { type: DataTypes.INTEGER },
    branchId: { type: DataTypes.INTEGER },
    billId: { type: DataTypes.INTEGER },
    type: { type: DataTypes.STRING },
    status: { type: DataTypes.STRING },
    price: { type: DataTypes.INTEGER },
    ntsConfirmNumber: { type: DataTypes.STRING },
    ntsResultCode: { type: DataTypes.STRING },
    mgtKey: { type: DataTypes.STRING },
    requestDatetime: { type: DataTypes.STRING },
    taxInvoiceJson: { type: DataTypes.JSON },
    cashBillJson: { type: DataTypes.JSON },
  },
  { sequelize, tableName: 'Receipts', timestamps: true },
);

export const associate = () => {
  // Receipts
  Receipts.belongsTo(Bills, { as: 'bill', foreignKey: 'billId' });
};
