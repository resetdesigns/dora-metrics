require('dotenv').config();

const axios = require('axios');
const { parse } = require('json2csv');
const fs = require('fs');

const ORG = process.env.ADO_ORG || '';
const PROJECT = process.env.ADO_PROJECT || '';
const PIPELINE_ID = process.env.ADO_PIPELINE_ID || '';
const PAT = process.env.ADO_PAT || '';
const API_URL = `https://dev.azure.com/${ORG}/${PROJECT}/_apis/pipelines/${PIPELINE_ID}/runs?api-version=7.1-preview.1`;

/**
 * Pull metrics from Azure DevOps and build CSV
 * ! Only supports one pipeline
 *
 * @param {*} callback
 */
const getAzureDevOpsMetrics = async (callback) => {
	try {
		const response = await axios.get(API_URL, {
			headers: {
				Authorization: `Basic ${Buffer.from(`:${PAT}`).toString('base64')}`,
			},
		});

		const pipelineData = response.data.value.map((run) => ({
			run_id: run.id,
			status: run.state,
			result: run.result,
			created_date: run.createdDate,
		}));

		const csv = parse(pipelineData);
		fs.writeFileSync('ado_pipelines.csv', csv);
		callback(undefined, { message: 'Azure DevOps pipeline data saved to ado_pipelines.csv' });
	} catch (error) {
		callback(undefined, { message: `Error fetching Azure DevOps pipelines: ${error.message}` });
	}
};

module.exports = getAzureDevOpsMetrics;
