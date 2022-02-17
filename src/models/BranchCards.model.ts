import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.BranchCards;

type CreationAttributes = Partial<M.BranchCards>;

export default class BranchCards extends Model<Attributes, CreationAttributes> implements Attributes {
  branchCardId: number;
  branchId: number;
  billKey: string;
  cardCode: string;
  cardName: string;
  cardNumber: string;
  acquCardCode: string;
  acquCardName: string;
  registDate: string;
  corporationFlag: boolean;
  lastUsedFlag: boolean;
  billingFlag: boolean;
}

BranchCards.init(
  {
    branchCardId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    billKey: { type: DataTypes.STRING, comment: '비인증 결제 키' },
    cardCode: { type: DataTypes.STRING, comment: '카드사 코드' },
    cardName: { type: DataTypes.STRING, comment: '카드사 이름' },
    cardNumber: { type: DataTypes.STRING, comment: '카드번호 뒤 4자리' },
    acquCardCode: { type: DataTypes.STRING, comment: '매입 카드사 코드' },
    acquCardName: { type: DataTypes.STRING, comment: '매입 카드사 이름' },
    registDate: { type: DataTypes.STRING, comment: '카드 등록일 / YYYY-MM-DD' },
    corporationFlag: { type: DataTypes.BOOLEAN, comment: '법인카드 여부' },
    lastUsedFlag: { type: DataTypes.BOOLEAN, comment: '마지막 사용한 카드 여부 / branchId 기준 하나만 true' },
    billingFlag: { type: DataTypes.BOOLEAN, comment: '이용료 자동 결제 여부 / branchId 기준 하나만 true' },
  },
  { sequelize, tableName: 'BranchCards', timestamps: true },
);

export const associate = () => {
  // BranchCards
};
