import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';
import Files from './Files.model';
import Images from './Images.model';

type Attributes = SequelizeTimeStamps & M.BranchSublets;

type CreationAttributes = Partial<M.BranchSublets>;

export default class BranchSublets extends Model<Attributes, CreationAttributes> implements Attributes {
  branchSubletId: number;
  branchId: number;
  name: string;
  businessNumber: string;
  corporationNumber: string;
  address: string;
  contact: string;
  signatureImageId: number | null;
  consentFileId: number | null;

  signatureImage?: M.Images;
  consentFile?: M.Files;
}

BranchSublets.init(
  {
    branchSubletId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, comment: '전대인 이름' },
    businessNumber: { type: DataTypes.STRING, comment: '전대인 사업자번호' },
    corporationNumber: { type: DataTypes.STRING, comment: '전대인 법인번호' },
    address: { type: DataTypes.STRING, comment: '전대인 주소' },
    contact: { type: DataTypes.STRING, comment: '전대인 연락처' },
    signatureImageId: { type: DataTypes.INTEGER },
    consentFileId: { type: DataTypes.INTEGER },
  },
  { sequelize, tableName: 'BranchSublets', timestamps: true },
);

export const associate = () => {
  BranchSublets.belongsTo(Images, { as: 'signatureImage', foreignKey: 'signatureImageId' });
  BranchSublets.belongsTo(Files, { as: 'consentFile', foreignKey: 'consentFileId' });
};
