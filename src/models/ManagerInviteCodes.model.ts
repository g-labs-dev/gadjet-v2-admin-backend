import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.ManagerInviteCodes;

type CreationAttributes = Partial<M.ManagerInviteCodes>;

export default class ManagerInviteCodes extends Model<Attributes, CreationAttributes> implements Attributes {
  managerInviteCode: string;
  hqId: number;
  branchId: number;
  managerId: number;
  hqRole: Partial<M.HqRoles>;
  branchRole: Partial<M.BranchRoles>;
  to: string;
  receivedFlag: boolean;

  manager?: M.Managers;
}

ManagerInviteCodes.init(
  {
    managerInviteCode: { type: DataTypes.STRING, primaryKey: true },
    hqId: { type: DataTypes.INTEGER },
    branchId: { type: DataTypes.INTEGER },
    managerId: { type: DataTypes.INTEGER, comment: '코드 생성해서 발송한 매니저 아이디' },
    hqRole: { type: DataTypes.JSON, comment: '적용 할 hqRole / hqId 가 있을 때 적용' },
    branchRole: { type: DataTypes.JSON, comment: '적용 할 branchRole / branchId 가 있을 때 적용' },
    to: { type: DataTypes.STRING, comment: '코드 받는사람 연락처 또는 이메일' },
    receivedFlag: { type: DataTypes.BOOLEAN },
  },
  { sequelize, tableName: 'ManagerInviteCodes', timestamps: true },
);

export const associate = () => {
  // ManagerInviteCodes
};
