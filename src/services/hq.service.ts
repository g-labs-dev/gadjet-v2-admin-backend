import HqRoles from '@models/HqRoles.model';
import Hqs from '@models/Hqs.model';
import Images from '@models/Images.model';

export const getHqs = async () => {
  return Hqs.findAll();
};

export const getHq = async (hqId: number) => {
  return Hqs.findOne({
    where: { hqId },
    include: [
      { model: Images, as: 'image' },
      { model: HqRoles, as: 'roles' },
    ],
  });
};

export const updateHq = async (hqId: number, hq: Partial<Hqs>) => {
  const model = await Hqs.findOne({ where: { hqId } });
  await model.update(hq);
  return model;
};

export const addHq = async (hq: Partial<Hqs>) => {
  return Hqs.create(hq);
};

export const deleteHq = async (hqId: number) => {
  return Hqs.destroy({ where: { hqId } });
};
