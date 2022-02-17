import { sequelize } from '@utils/sequelize';

import BranchAutomations from '@models/BranchAutomations.model';
import BranchBusinesses from '@models/BranchBusinesses.model';
import BranchContractDocuments from '@models/BranchContractDocuments.model';
import BranchRentees from '@models/BranchRentees.model';
import BranchSettlements from '@models/BranchSettlements.model';
import BranchSublets from '@models/BranchSublets.model';
import Branches from '@models/Branches.model';

export const getBranch = (branchId: number) => {
  return Branches.findOne({ where: { branchId } });
};

export const getBranches = (hqId: number) => {
  return Branches.findAll({ where: { hqId } });
};

export const getBranchBusiness = (branchId: number) => {
  return BranchBusinesses.findOne({ where: { branchId } });
};

export const getBranchSettlement = (branchId: number) => {
  return BranchSettlements.findOne({ where: { branchId } });
};

export const getBranchContractDocument = (branchId: number) => {
  return BranchContractDocuments.findOne({ where: { branchId } });
};

export const getBranchSublet = (branchId: number) => {
  return BranchSublets.findOne({ where: { branchId } });
};

export const getBranchRentee = (branchId: number) => {
  return BranchRentees.findOne({ where: { branchId } });
};

export const getBranchAutomation = (branchId: number) => {
  return BranchAutomations.findOne({ where: { branchId } });
};

export const addBranch = async (hqId: number, branch: Partial<Branches>) => {
  const transaction = await sequelize.transaction();
  try {
    const newBranch = await Branches.create({ ...branch, hqId }, { transaction });

    await BranchBusinesses.create({ branchId: newBranch.branchId }, { transaction });
    await BranchSettlements.create({ branchId: newBranch.branchId }, { transaction });
    await BranchContractDocuments.create({ branchId: newBranch.branchId }, { transaction });
    await BranchSublets.create({ branchId: newBranch.branchId }, { transaction });
    await BranchRentees.create({ branchId: newBranch.branchId }, { transaction });
    await BranchAutomations.create({ branchId: newBranch.branchId }, { transaction });

    await transaction.commit();
    return newBranch;
  } catch (error) {
    await transaction.rollback();
    throw new Error(error);
  }
};

export const updateBranch = async (branchId: number, branch: Partial<Branches>) => {
  const model = await Branches.findOne({ where: { branchId } });
  await model.update(branch);
  return model;
};

export const updateBranchBusiness = async (branchId: number, branchBusiness: Partial<BranchBusinesses>) => {
  const model = await BranchBusinesses.findOne({ where: { branchId } });
  await model.update(branchBusiness);
  return model;
};
export const updateBranchSettlement = async (branchId: number, branchSettlement: Partial<BranchSettlements>) => {
  const model = await BranchSettlements.findOne({ where: { branchId } });
  await model.update(branchSettlement);
  return model;
};
export const updateBranchContractDocument = async (branchId: number, branchContractDocument: Partial<BranchContractDocuments>) => {
  const model = await BranchContractDocuments.findOne({ where: { branchId } });
  await model.update(branchContractDocument);
  return model;
};
export const updateBranchSublet = async (branchId: number, branchSublet: Partial<BranchSublets>) => {
  const model = await BranchSublets.findOne({ where: { branchId } });
  await model.update(branchSublet);
  return model;
};
export const updateBranchRentee = async (branchId: number, branchRentee: Partial<BranchRentees>) => {
  const model = await BranchRentees.findOne({ where: { branchId } });
  await model.update(branchRentee);
  return model;
};
export const updateBranchAutomation = async (branchId: number, branchAutomation: Partial<BranchAutomations>) => {
  const model = await BranchAutomations.findOne({ where: { branchId } });
  await model.update(branchAutomation);
  return model;
};
