import { Router } from 'express';
import * as HqType from 'gadjet-v2-types/dist/api/admin/hq';

import * as hqService from '@services/hq.service';

import onError from '@utils/error';

const router = Router({ mergeParams: true, caseSensitive: true });

export const hqRouter = (): Router => {
  router.get<HqType.GET_DETAIL_PARAMS, HqType.GET_DETAIL_RESPONSE>('/:hqId', async (req, res) => {
    const { hqId } = req.params;

    try {
      const hq = await hqService.getHq(Number(hqId));
      res.json(hq);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.get<HqType.GET_LIST_PARAMS, HqType.GET_LIST_RESPONSE>('', async (req, res) => {
    try {
      const hqs = await hqService.getHqs();
      res.json(hqs);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.post<HqType.ADD_PARAMS, HqType.ADD_RESPONSE, HqType.ADD_BODY>('', async (req, res) => {
    const { hq } = req.body;
    try {
      const result = await hqService.addHq(hq);
      res.json(result);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.put<HqType.UPDATE_PARAMS, HqType.UPDATE_RESPONSE, HqType.UPDATE_BODY>('/:hqId', async (req, res) => {
    const { hqId } = req.params;
    const { hq } = req.body;
    try {
      const result = await hqService.updateHq(hqId, hq);
      res.json(result);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  router.delete<HqType.DELETE_PARAMS, HqType.DELETE_RESPONSE>('/:hqId', async (req, res) => {
    const { hqId } = req.params;
    try {
      const result = await hqService.deleteHq(hqId);
      res.json([result]);
    } catch (error) {
      onError(error);
      res.sendStatus(500);
    }
  });

  return router;
};
