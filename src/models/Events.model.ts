import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { CreditType } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';
import Branches from './Branches.model';
import EventAttendees from './EventAttendees.model';
import Images from './Images.model';

type Attributes = SequelizeTimeStamps & M.Events;

type CreationAttributes = Partial<M.Events>;

export default class Events extends Model<Attributes, CreationAttributes> implements Attributes {
  eventId: number;
  branchId: number;
  title: string;
  content: string;
  price: number;
  openDate: string;
  applyStartDate: string;
  applyEndDate: string;
  startDate: string;
  endDate: string;
  maxAttendeeCount: number;
  attendeeCount: number;
  place: string;
  address: string;
  addressDetail: string;
  lat: string;
  lng: string;
  availableCreditType: CreditType[];
  onlineFlag: boolean;
  bannerImageId: number | null;

  branch?: M.Branches;
  bannerImage?: M.Images;
  eventAttendees?: M.EventAttendees[];
}

Events.init(
  {
    eventId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    branchId: { type: DataTypes.INTEGER },
    title: { type: DataTypes.STRING, comment: '제목' },
    content: { type: DataTypes.TEXT, comment: '내용 / html + 이모지' },
    price: { type: DataTypes.INTEGER, comment: '참가비 / 0이면 무료' },
    openDate: { type: DataTypes.STRING, comment: '공개일 / YYYY-MM-DD' },
    applyStartDate: { type: DataTypes.STRING, comment: '참가 신청일 / YYYY-MM-DD' },
    applyEndDate: { type: DataTypes.STRING, comment: '참가 종료일 / YYYY-MM-DD' },
    startDate: { type: DataTypes.STRING, comment: '이벤트 시작일 / YYYY-MM-DD' },
    endDate: { type: DataTypes.STRING, comment: '이벤트 종료일 / YYYY-MM-DD' },
    maxAttendeeCount: { type: DataTypes.INTEGER, comment: '최대 참가자 수 / 0 이면 제한 없음' },
    attendeeCount: { type: DataTypes.INTEGER, comment: '현재 참가자 수' },
    place: { type: DataTypes.STRING, comment: '장소 이름' },
    address: { type: DataTypes.STRING, comment: '장소 주소' },
    addressDetail: { type: DataTypes.STRING, comment: '장소 주소 상세' },
    lat: { type: DataTypes.STRING, comment: 'latitude' },
    lng: { type: DataTypes.STRING, comment: 'longitude' },
    availableCreditType: { type: DataTypes.JSON, comment: '사용 가능한 크레딧 타입' },
    onlineFlag: { type: DataTypes.BOOLEAN, comment: '온라인 행사 여부' },
    bannerImageId: { type: DataTypes.INTEGER },
  },
  { sequelize, tableName: 'Events', timestamps: true },
);

export const associate = () => {
  Events.belongsTo(Branches, { as: 'branch', foreignKey: 'branchId' });
  Events.belongsTo(Images, { as: 'bannerImage', foreignKey: 'bannerImageId' });
  Events.hasMany(EventAttendees, { as: 'eventAttendees', foreignKey: 'eventId' });
};
