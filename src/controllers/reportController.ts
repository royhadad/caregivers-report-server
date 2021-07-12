import {Request, Response} from 'express';
import {QueryResult} from 'pg';
import * as dbUtil from './../utils/dbUtil';

interface Report {
    year: number,
    caregivers: {
        name: string,
        patients: string[]
    }[]
}

export const getReport = async (req: Request, res: Response) => {
    const {year} = req.params;

    const sql = `
        SELECT
            caregiver.id                 AS caregiver_id,
            array_agg(caregiver.name)    AS caregiver_names,
            array_agg(patient.id)        AS patients_ids,
            array_agg(patient.name)      AS patients_names,
            array_agg(visit.date)        AS visit_dates
        FROM caregiver
        JOIN visit ON visit.caregiver = caregiver.id
        JOIN patient ON patient.id = visit.patient
        WHERE visit.date BETWEEN '$${year}-01-01' AND '$${year}-12-31'
        GROUP BY caregiver.id
    `;
    
    let result : QueryResult;
    try {
        result = await dbUtil.sqlToDB(sql, []);
        const report: Report = {
            year: parseInt(year),
            caregivers: []
        };

        for ( let row of result.rows) {
            report.caregivers.push({
                name: row.caregiver_names[0],
                patients: row.patients_names
            })
        }
        res.status(200).json(report);
    } catch (error) {
        throw new Error(error.message);
    }

}
