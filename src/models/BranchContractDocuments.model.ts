import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import * as T from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Files from './Files.model';
import Images from './Images.model';

type Attributes = SequelizeTimeStamps & M.BranchContractDocuments;

type CreationAttributes = Partial<M.BranchContractDocuments>;

export default class BranchContractDocuments extends Model<Attributes, CreationAttributes> implements Attributes {
  branchContractDocumentId: number;
  branchId: number;
  zipcode: string;
  address: string;
  addressDetail: string;
  buildingContractType: T.BranchBuildingContractType;
  creditPolicy: T.ContractCreditPolicy;
  deposit: string;
  rent: string;
  area: string;
  managementFee: string;
  signatureImageId: number | null;
  termsFileId: number | null;
  policyFileId: number | null;
  etcFileId: number | null;

  signatureImage?: M.Images;
  termsFile?: M.Files;
  policyFile?: M.Files;
  etcFile?: M.Files;
}

BranchContractDocuments.init(
  {
    branchContractDocumentId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    zipcode: { type: DataTypes.STRING, comment: '건물 우편번호' },
    address: { type: DataTypes.STRING, comment: '건물 주소' },
    addressDetail: { type: DataTypes.STRING, comment: '건물 상세주소' },
    buildingContractType: { type: DataTypes.STRING, defaultValue: 'none', comment: '건물 계약 종류(임대,전대) / rent | sublet' },
    creditPolicy: { type: DataTypes.STRING, defaultValue: 'weekly', comment: '계약 크레딧 정책 / weekly | monlty ' },
    deposit: { type: DataTypes.STRING, comment: '건물 보증금' },
    rent: { type: DataTypes.STRING, comment: '건물 임대료' },
    area: { type: DataTypes.STRING, comment: '건물 면적' },
    managementFee: { type: DataTypes.STRING, comment: '건물 관리비' },
    signatureImageId: { type: DataTypes.INTEGER },
    termsFileId: { type: DataTypes.INTEGER },
    policyFileId: { type: DataTypes.INTEGER },
    etcFileId: { type: DataTypes.INTEGER },
  },
  { sequelize, tableName: 'BranchContractDocuments', timestamps: true, comment: '계약서에 이용 될 지점 정보' },
);

export const associate = () => {
  BranchContractDocuments.belongsTo(Images, { as: 'signatureImage', foreignKey: 'signatureImageId' });
  BranchContractDocuments.belongsTo(Files, { as: 'termsFile', foreignKey: 'termsFileId' });
  BranchContractDocuments.belongsTo(Files, { as: 'policyFile', foreignKey: 'policyFileId' });
  BranchContractDocuments.belongsTo(Files, { as: 'etcFile', foreignKey: 'etcFileId' });
};
