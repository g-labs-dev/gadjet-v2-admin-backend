import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';
import Managers from './Managers.model';

type Attributes = SequelizeTimeStamps & M.ContractInviteCodes;

type CreationAttributes = Partial<M.ContractInviteCodes>;

export default class ContractInviteCodes extends Model<Attributes, CreationAttributes> implements Attributes {
  inviteCode: string;
  contractId: number;
  managerId: number;
  to: string;
  receivedFlag: boolean;

  manager?: M.Managers;
}

ContractInviteCodes.init(
  {
    inviteCode: { type: DataTypes.STRING, primaryKey: true },
    contractId: { type: DataTypes.INTEGER, comment: '초대보낸 계약 아이디' },
    managerId: { type: DataTypes.INTEGER, comment: '초대보낸 매니저 아이디 (제거예정)' },
    to: { type: DataTypes.STRING, comment: '받는사람 연락처 (전화번호 또는 이메일)' },
    receivedFlag: { type: DataTypes.BOOLEAN },
  },
  { sequelize, tableName: 'ContractInviteCodes', timestamps: true },
);

export const associate = () => {
  ContractInviteCodes.belongsTo(Managers, { as: 'manager', foreignKey: 'managerId' });
};
