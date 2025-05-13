import axios from 'axios';
import { parse } from 'json2csv';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const ORG = process.env.ADO_ORG || '';
const PROJECT = process.env.ADO_PROJECT || '';
const PIPELINE_ID = process.env.ADO_PIPELINE_ID || '';
const PAT = process.env.ADO_PAT || '';
const API_URL = `https://dev.azure.com/${ORG}/${PROJECT}/_apis/pipelines/${PIPELINE_ID}/runs?api-version=7.1-preview.1`;

const fetchAzurePipelines = async () => {
	try {
		const response = await axios.get(API_URL, {
			headers: { Authorization: `Basic ${Buffer.from(`:${PAT}`).toString('base64')}` },
		});

		const pipelineData = response.data.value.map((run: any) => ({
			run_id: run.id,
			status: run.state,
			result: run.result,
			created_date: run.createdDate,
		}));

		const csv = parse(pipelineData);
		fs.writeFileSync('ado_pipelines.csv', csv);
		console.log('Azure DevOps pipeline data saved to ado_pipelines.csv');
	} catch (error) {
		console.error('Error fetching Azure DevOps pipelines:', error.message);
	}
};

fetchAzurePipelines();
