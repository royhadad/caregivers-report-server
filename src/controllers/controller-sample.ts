import { Request, Response } from 'express';
import logger = require('./../utils/logger');
import * as sampleModel from './../models/model-sample';
import { QueryResult } from 'pg';

// sample controller
export const getTime = async (req: Request, res: Response) => {
    let result : QueryResult;
    try {
        result = await sampleModel.getTimeModel();
        res.status(200).json(result.rows);
    } catch (error) {
        logger.error(`getTime error: ${error.message}`);
        res.status(500).json({error: error.message});
    }
}
