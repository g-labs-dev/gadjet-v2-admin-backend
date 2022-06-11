import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

import { sequelize } from '@utils/sequelize';

import BranchAutomations from './BranchAutomations.model';
import BranchBusinesses from './BranchBusinesses.model';
import BranchContractDocuments from './BranchContractDocuments.model';
import BranchRentees from './BranchRentees.model';
import BranchRoles from './BranchRoles.model';
import BranchSettlements from './BranchSettlements.model';
import BranchSublets from './BranchSublets.model';
import Contracts from './Contracts.model';
import Floors from './Floors.model';
import Hqs from './Hqs.model';
import Payments from './Payments.model';
import SpaceTypes from './SpaceTypes.model';

type Attributes = SequelizeTimeStamps & M.Branches;

type CreationAttributes = Partial<M.Branches>;

export default class Branches extends Model<Attributes, CreationAttributes> implements Attributes {
  branchId: number;
  hqId: number;
  name: string;
  contact: string;
  email: string;
  zipcode: string;
  address: string;
  addressDetail: string;
  popbillId: string | null;
  chargeNotice: number;
  remainDate: number;

  hq?: M.Hqs;
  business?: M.BranchBusinesses;
  settlement?: M.BranchSettlements;
  contractDocument?: M.BranchContractDocuments;
  sublet?: M.BranchSublets;
  rentee?: M.BranchRentees;
  automation?: M.BranchAutomations;
  roles?: M.BranchRoles[];
  floors?: M.Floors[];
  spaceTypes?: M.SpaceTypes[];
  contracts?: M.Contracts[];
  payments?: M.Payments[];
}

Branches.init(
  {
    branchId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    hqId: { type: DataTypes.INTEGER },
    name: { type: DataTypes.STRING, comment: '지점 이름' },
    contact: { type: DataTypes.STRING, comment: '지점 연락처' },
    email: { type: DataTypes.STRING, comment: '지점 이메일' },
    zipcode: { type: DataTypes.STRING, comment: '지점 우편번호' },
    address: { type: DataTypes.STRING, comment: '지점 주소' },
    addressDetail: { type: DataTypes.STRING, comment: '지점 상세주소' },
    popbillId: { type: DataTypes.STRING, comment: '팝빌 아이디' },
    chargeNotice: { type: DataTypes.INTEGER },
    remainDate: { type: DataTypes.INTEGER },
  },
  { sequelize, tableName: 'Branches', timestamps: true },
);

export const associate = () => {
  Branches.belongsTo(Hqs, { as: 'hq', foreignKey: 'hqId' });

  Branches.hasOne(BranchBusinesses, { as: 'business', foreignKey: 'branchId' });
  Branches.hasOne(BranchSettlements, { as: 'settlement', foreignKey: 'branchId' });
  Branches.hasOne(BranchContractDocuments, { as: 'contractDocument', foreignKey: 'branchId' });
  Branches.hasOne(BranchSublets, { as: 'sublet', foreignKey: 'branchId' });
  Branches.hasOne(BranchRentees, { as: 'rentee', foreignKey: 'branchId' });
  Branches.hasOne(BranchAutomations, { as: 'automation', foreignKey: 'branchId' });

  Branches.hasMany(BranchRoles, { as: 'roles', foreignKey: 'branchId' });
  Branches.hasMany(Floors, { as: 'floors', foreignKey: 'branchId' });
  Branches.hasMany(SpaceTypes, { as: 'spaceTypes', foreignKey: 'branchId' });
  Branches.hasMany(Contracts, { as: 'contracts', foreignKey: 'branchId' });
  Branches.hasMany(Payments, { as: 'payments', foreignKey: 'branchId' });
};
