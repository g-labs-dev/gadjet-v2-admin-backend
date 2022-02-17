import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.BranchBusinesses;

type CreationAttributes = Partial<M.BranchBusinesses>;

export default class BranchBusinesses extends Model<Attributes, CreationAttributes> implements Attributes {
  branchBusinessId: number;
  branchId: number;
  director: string;
  name: string;
  address: string;
  identityNumber: string;
  businessNumber: string;
  corporationNumber: string;
  businessType: string;
  businessClass: string;
  managers: [
    { name: string; department: string; tel: string; contact: string; email: string },
    { name: string; department: string; tel: string; contact: string; email: string },
  ];
}

BranchBusinesses.init(
  {
    branchBusinessId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    director: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING, comment: '사업자 이름' },
    address: { type: DataTypes.STRING, comment: '사업자 주소' },
    identityNumber: { type: DataTypes.STRING, comment: '종 사업장 번호' },
    businessNumber: { type: DataTypes.STRING, comment: '사업자 번호' },
    corporationNumber: { type: DataTypes.STRING, comment: '법인번호' },
    businessType: { type: DataTypes.STRING, comment: '업태' },
    businessClass: { type: DataTypes.STRING, comment: '업종' },
    managers: { type: DataTypes.JSON, comment: '담당자 정보' },
  },
  { sequelize, tableName: 'BranchBusinesses', timestamps: true },
);

export const associate = () => {};
