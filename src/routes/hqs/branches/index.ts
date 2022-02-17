import { Router } from 'express';
import * as BranchType from 'gadjet-v2-types/dist/api/admin/branch';

import * as branchService from '@services/branch.service';

import onError from '@utils/error';

const router = Router({ mergeParams: true, caseSensitive: true });

export const branchRouter = () => {
  router.get<BranchType.GET_DETAIL_PARAMS, BranchType.GET_DETAIL_RESPONSE>('/:branchId', async (req, res) => {
    const { branchId } = req.params;
    try {
      const branch = await branchService.getBranch(branchId);
      res.json(branch);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.get<BranchType.GET_LIST_PARAMS, BranchType.GET_LIST_RESPONSE>('/', async (req, res) => {
    const { hqId } = req.params;
    try {
      const branches = await branchService.getBranches(hqId);
      res.json(branches);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.get<BranchType.GET_BUSINESS_PARAMS, BranchType.GET_BUSINESS_RESPONSE>('/:branchId/business', async (req, res) => {
    const { branchId } = req.params;
    try {
      const branchBusiness = await branchService.getBranchBusiness(branchId);
      res.json(branchBusiness);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.get<BranchType.GET_SETTLEMENT_PARAMS, BranchType.GET_SETTLEMENT_RESPONSE>('/:branchId/settlement', async (req, res) => {
    const { branchId } = req.params;
    try {
      const branchSettlement = await branchService.getBranchSettlement(branchId);
      res.json(branchSettlement);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.get<BranchType.GET_CONTRACT_DOCUMENT_PARAMS, BranchType.GET_CONTRACT_DOCUMENT_RESPONSE>('/:branchId/contract-document', async (req, res) => {
    const { branchId } = req.params;
    try {
      const branchContractDocument = await branchService.getBranchContractDocument(branchId);
      res.json(branchContractDocument);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.get<BranchType.GET_SUBLET_PARAMS, BranchType.GET_SUBLET_RESPONSE>('/:branchId/sublet', async (req, res) => {
    const { branchId } = req.params;
    try {
      const branchSublet = await branchService.getBranchSublet(branchId);
      res.json(branchSublet);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.get<BranchType.GET_RENTEE_PARAMS, BranchType.GET_RENTEE_RESPONSE>('/:branchId/rentee', async (req, res) => {
    const { branchId } = req.params;
    try {
      const branchRentee = await branchService.getBranchRentee(branchId);
      res.json(branchRentee);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.get<BranchType.GET_AUTOMATION_PARAMS, BranchType.GET_AUTOMATION_RESPONSE>('/:branchId/automation', async (req, res) => {
    const { branchId } = req.params;
    try {
      const branchAutomation = await branchService.getBranchAutomation(branchId);
      res.json(branchAutomation);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.post<BranchType.ADD_PARAMS, BranchType.ADD_RESPONSE, BranchType.ADD_BODY>('', async (req, res) => {
    const { hqId } = req.params;
    const { branch } = req.body;
    try {
      const result = await branchService.addBranch(hqId, branch);
      res.json(result);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.put<BranchType.UPDATE_PARAMS, BranchType.UPDATE_RESPONSE, BranchType.UPDATE_BODY>('', async (req, res) => {
    const { branchId } = req.params;
    const { branch } = req.body;
    try {
      const result = await branchService.updateBranch(branchId, branch);
      res.json(result);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.put<BranchType.UPDATE_BUSINESS_PARAMS, BranchType.UPDATE_BUSINESS_RESPONSE, BranchType.UPDATE_BUSINESS_BODY>(
    '/:branchId/business',
    async (req, res) => {
      const { branchId } = req.params;
      const { branchBusiness } = req.body;
      try {
        const result = await branchService.updateBranchBusiness(branchId, branchBusiness);
        res.json(result);
      } catch (error) {
        onError(error);
        res.sendStatus(500);
      }
    },
  );

  router.put<BranchType.UPDATE_SETTLEMENT_PARAMS, BranchType.UPDATE_SETTLEMENT_RESPONSE, BranchType.UPDATE_SETTLEMENT_BODY>(
    '/:branchId/settlement',
    async (req, res) => {
      const { branchId } = req.params;
      const { branchSettlement } = req.body;
      try {
        const result = await branchService.updateBranchSettlement(branchId, branchSettlement);
        res.json(result);
      } catch (error) {
        onError(error);
        res.sendStatus(500);
      }
    },
  );

  router.put<BranchType.UPDATE_CONTRACT_DOCUMENT_PARAMS, BranchType.UPDATE_CONTRACT_DOCUMENT_RESPONSE, BranchType.UPDATE_CONTRACT_DOCUMENT_BODY>(
    '/:branchId/contract-document',
    async (req, res) => {
      const { branchId } = req.params;
      const { branchContractDocument } = req.body;
      try {
        const result = await branchService.updateBranchContractDocument(branchId, branchContractDocument);
        res.json(result);
      } catch (error) {
        onError(error);
        res.sendStatus(500);
      }
    },
  );

  router.put<BranchType.UPDATE_SUBLET_PARAMS, BranchType.UPDATE_SUBLET_RESPONSE, BranchType.UPDATE_SUBLET_BODY>(
    '/:branchId/sublet',
    async (req, res) => {
      const { branchId } = req.params;
      const { branchSublet } = req.body;
      try {
        const result = await branchService.updateBranchSublet(branchId, branchSublet);
        res.json(result);
      } catch (error) {
        onError(error);
        res.sendStatus(500);
      }
    },
  );

  router.put<BranchType.UPDATE_RENTEE_PARAMS, BranchType.UPDATE_RENTEE_RESPONSE, BranchType.UPDATE_RENTEE_BODY>(
    '/:branchId/rentee',
    async (req, res) => {
      const { branchId } = req.params;
      const { branchRentee } = req.body;
      try {
        const result = await branchService.updateBranchRentee(branchId, branchRentee);
        res.json(result);
      } catch (error) {
        onError(error);
        res.sendStatus(500);
      }
    },
  );

  router.put<BranchType.UPDATE_AUTOMATION_PARAMS, BranchType.UPDATE_AUTOMATION_RESPONSE, BranchType.UPDATE_AUTOMATION_BODY>(
    '/:branchId/automation',
    async (req, res) => {
      const { branchId } = req.params;
      const { branchAutomation } = req.body;
      try {
        const result = await branchService.updateBranchAutomation(branchId, branchAutomation);
        res.json(result);
      } catch (error) {
        onError(error);
        res.sendStatus(500);
      }
    },
  );

  return router;
};
