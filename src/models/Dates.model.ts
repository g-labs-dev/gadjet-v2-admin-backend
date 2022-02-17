import { sequelize } from '@utils/sequelize';
import * as M from 'gadjet-v2-types/dist/model';
import { DayIndex } from 'gadjet-v2-types/dist/type';
import { DataTypes, Model } from 'sequelize';

type Attributes = SequelizeTimeStamps & M.Dates;

type CreationAttributes = Partial<M.Dates>;

export default class Dates extends Model<Attributes, CreationAttributes> implements Attributes {
  yyyymmdd: number;
  year: number;
  month: number;
  date: number;
  dateString: string;
  dayIndex: DayIndex;
  weekendFlag: boolean;
  holidayFlag: boolean;
  nextBusinessDate: string;
}

Dates.init(
  {
    yyyymmdd: { type: DataTypes.INTEGER, primaryKey: true },
    year: { type: DataTypes.INTEGER, comment: 'YYYY' },
    month: { type: DataTypes.INTEGER, comment: 'MM' },
    date: { type: DataTypes.INTEGER, comment: 'DD' },
    dateString: { type: DataTypes.STRING, comment: 'YYYY-MM-DD' },
    dayIndex: { type: DataTypes.INTEGER, comment: '0:일 ~ 6:토' },
    weekendFlag: { type: DataTypes.BOOLEAN, comment: '주말 여부' },
    holidayFlag: { type: DataTypes.BOOLEAN, comment: '휴일 여부' },
    nextBusinessDate: { type: DataTypes.STRING, comment: '다음 영업일 / YYYY-MM-DD' },
  },
  { sequelize, tableName: 'Dates', timestamps: true },
);

export const associate = () => {
  // Dates
};
