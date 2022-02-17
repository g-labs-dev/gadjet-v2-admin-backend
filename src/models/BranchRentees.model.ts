import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';
import Images from './Images.model';

type Attributes = SequelizeTimeStamps & M.BranchRentees;

type CreationAttributes = Partial<M.BranchRentees>;

export default class BranchRentees extends Model<Attributes, CreationAttributes> implements Attributes {
  branchRenteeId: number;
  branchId: number;
  name: string;
  businessNumber: string;
  corporationNumber: string;
  address: string;
  contact: string;
  signatureImageId: number | null;

  signatureImage?: M.Images;
}

BranchRentees.init(
  {
    branchRenteeId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, comment: '임대인 이름' },
    businessNumber: { type: DataTypes.STRING, comment: '임대인 사업자번호' },
    corporationNumber: { type: DataTypes.STRING, comment: '임대인 법인번호' },
    address: { type: DataTypes.STRING, comment: '임대인 주소' },
    contact: { type: DataTypes.STRING, comment: '임대인 연락처' },
    signatureImageId: { type: DataTypes.INTEGER },
  },
  { sequelize, tableName: 'BranchRentees', timestamps: true },
);

export const associate = () => {
  BranchRentees.belongsTo(Images, { as: 'signatureImage', foreignKey: 'signatureImageId' });
};
