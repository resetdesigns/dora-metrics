require('dotenv').config();

const axios = require('axios');
const { parse } = require('json2csv');
const fs = require('fs');

const JIRA_URL = process.env.JIRA_URL || '';
const JIRA_EMAIL = process.env.JIRA_EMAIL || '';
const JIRA_TOKEN = process.env.JIRA_TOKEN || '';
const PROJECT = process.env.JIRA_PROJECT_KEY;
const API_URL = `${JIRA_URL}/rest/api/3/search?jql=project=${PROJECT}&fields=summary,status,created,resolutiondate,customfield_10004&maxResults=100`;

/**
 * Pull metrics from Jira and build CSV
 * ! Only supports one project
 *
 * @param {*} callback
 */
const getJiraMetrics = async (callback) => {
	try {
		const response = await axios.get(API_URL, {
			headers: {
				Authorization: `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_TOKEN}`).toString('base64')}`,
				Accept: 'application/json',
			},
		});

		const issuesData = response.data.issues.map((issue) => ({
			key: issue.key,
			status: issue.fields.status.name,
			created: issue.fields.created,
			resolved: issue.fields.resolutiondate || '',
			story_points: issue.fields.customfield_10004 || 0,
		}));

		const csv = parse(issuesData);
		fs.writeFileSync('jira_issues.csv', csv);
		callback(undefined, { message: 'Jira issues data saved to jira_issues.csv' });
	} catch (error) {
		callback(undefined, { message: `Error fetching GitHub PRs: ${error.message}` });
	}
};

module.exports = getJiraMetrics;
