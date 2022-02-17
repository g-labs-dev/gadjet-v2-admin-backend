import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import {
  ContractBillingType,
  ContractBillingSplitType,
  ContractLateFeeType,
  ContractStatus,
  ContractSignatureStatus,
  ContractExtendStatus,
  ContractReceiver,
  ContractTenant,
  ContractDirector,
  ContractContractor,
  Lang,
} from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Bills from './Bills.model';
import Branches from './Branches.model';
import ContractAdditions from './ContractAdditions.model';
import ContractDeposits from './ContractDeposits.model';
import ContractQueries from './ContractQueries.model';
import ContractSpaces from './ContractSpaces.model';
import Files from './Files.model';
import Images from './Images.model';

type Attributes = SequelizeTimeStamps & M.Contracts;

type CreationAttributes = Partial<M.Contracts>;

export default class Contracts extends Model<Attributes, CreationAttributes> implements Attributes {
  contractId: number;
  branchId: number;
  tenantId: number | null;
  startDate: string;
  endDate: string;
  suspendDate: string;
  address: string;
  population: number;
  paymentDate: number;
  billingType: ContractBillingType;
  billingSplitType: ContractBillingSplitType;
  paymentDueDate: number;
  lateFeeType: ContractLateFeeType;
  lateFee: number;
  lateFeeDeferDate: number;
  creditAmount: number;
  publicMemo: string;
  privateMemo: string;
  status: ContractStatus;
  signatureStatus: ContractSignatureStatus;
  signatureImageId: number | null;
  documentFileId: number | null;
  extendStatus: ContractExtendStatus;
  extendCheckDate: string;
  extendContractId: number | null;
  extendSinceDate: string;
  lang: Lang;
  receiver: ContractReceiver;
  tenant: ContractTenant;
  director: ContractDirector;
  contractor: ContractContractor;

  query?: M.ContractQueries;
  contractDeposit?: M.ContractDeposits;
  contractSpaces?: M.ContractSpaces[];
  contractAdditions?: M.ContractAdditions[];
  bills?: M.Bills[];

  branch?: M.Branches;
  signatureImage?: M.Images;
  documentFile?: M.Files;
  parentContract?: M.Contracts;
}

Contracts.init(
  {
    contractId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    tenantId: { type: DataTypes.INTEGER },
    startDate: { type: DataTypes.STRING, comment: '계약 시작일' },
    endDate: { type: DataTypes.STRING, comment: '계약 종료일' },
    suspendDate: { type: DataTypes.STRING, comment: '실제 계약 종료일' },
    address: { type: DataTypes.STRING, comment: '계약주소' },
    population: { type: DataTypes.INTEGER, comment: '계약인원' },
    paymentDate: { type: DataTypes.INTEGER, comment: '입금일 (ex. 25이면 매 달 25일에 납부)' },
    billingType: { type: DataTypes.STRING, comment: '선납,월세 구분 / prepayment | monthly' },
    billingSplitType: { type: DataTypes.STRING, comment: '청구서 분할 방식 / A | B' },
    paymentDueDate: { type: DataTypes.INTEGER, comment: '납부기한 / 입금일 이후 n일까지 납부. 지나면 연체료 부과' },
    lateFeeType: { type: DataTypes.STRING, defaultValue: 'none', comment: '연체료 타입 / none | fix | rate' },
    lateFee: { type: DataTypes.INTEGER, comment: '연체료 / lateFeeType 별 다르게 적용' },
    lateFeeDeferDate: { type: DataTypes.INTEGER, comment: '연체료 유예기간 (Bills.lateFeeDate = Bills.paymentEndDate + Contracts.lateFeeDeferDate)' },
    creditAmount: { type: DataTypes.INTEGER, comment: 'contract 타입 크레딧 지급량' },
    publicMemo: { type: DataTypes.TEXT, comment: '공개 메모 / 계약서에 포함' },
    privateMemo: { type: DataTypes.TEXT, comment: '비공개 메모 / 매니저만 조회 가능' },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'before-started',
      comment: '계약 상태 / before-started | started | expired | suspended | extended',
    },
    signatureStatus: { type: DataTypes.STRING, comment: '서명 상태 / none | waiting | signed' },
    signatureImageId: { type: DataTypes.INTEGER, comment: '서명 Images 아이디' },
    documentFileId: { type: DataTypes.INTEGER, comment: '계약서 Files 아이디' },
    extendStatus: { type: DataTypes.STRING, defaultValue: 'none', comment: '계약연장 상태 / none | asked | approval | refusal' },
    extendCheckDate: { type: DataTypes.STRING, comment: '계약 연장 확인 날짜' },
    extendContractId: { type: DataTypes.INTEGER },
    extendSinceDate: { type: DataTypes.STRING, comment: '최초 계약일 (부모 계약 시작일)' },
    lang: { type: DataTypes.STRING, defaultValue: 'ko', comment: '언어 / 계약서, 푸시알림, 이메일에 사용 됨' },
    receiver: { type: DataTypes.JSON, comment: '알림 받을 사람' },
    tenant: { type: DataTypes.JSON, comment: '입주사' },
    director: { type: DataTypes.JSON, comment: '계약 대표자' },
    contractor: { type: DataTypes.JSON, comment: '계약자' },
  },
  {
    sequelize,
    tableName: 'Contracts',
    timestamps: true,
    hooks: {},
  },
);

export const associate = () => {
  Contracts.hasOne(ContractQueries, { as: 'query', foreignKey: 'contractId' });

  Contracts.hasOne(ContractDeposits, { as: 'contractDeposit', foreignKey: 'contractId' });
  Contracts.hasMany(ContractSpaces, { as: 'contractSpaces', foreignKey: 'contractId' });
  Contracts.hasMany(ContractAdditions, { as: 'contractAdditions', foreignKey: 'contractId' });
  Contracts.hasMany(Bills, { as: 'bills', foreignKey: 'contractId' });

  Contracts.belongsTo(Branches, { as: 'branch', foreignKey: 'branchId' });
  Contracts.belongsTo(Images, { as: 'signatureImage', foreignKey: 'signatureImageId' });
  Contracts.belongsTo(Files, { as: 'documentFile', foreignKey: 'documentFileId' });
  Contracts.belongsTo(Contracts, { as: 'parentContract', foreignKey: 'extendContractId' });
};
