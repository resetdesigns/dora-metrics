require('dotenv').config();

const axios = require('axios');
const { parse } = require('json2csv');
const fs = require('fs');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const REPO = process.env.GITHUB_REPO;
const API_URL = `https://api.github.com/repos/${REPO}/pulls?state=closed&per_page=100`;

/**
 * Pull metrics from Github and build CSV
 * ! Only supports one repo
 *
 * @param {*} callback
 */
const getGithubMetrics = async (callback) => {
	try {
		const response = await axios.get(API_URL, {
			headers: { Authorization: `token ${GITHUB_TOKEN}` },
		});

		const prData = response.data.map((pr) => ({
			pr_number: pr.number,
			created_at: pr.created_at,
			merged_at: pr.merged_at,
			time_to_merge_hrs: pr.merged_at
				? ((new Date(pr.merged_at).getTime() - new Date(pr.created_at).getTime()) / 3600000).toFixed(
						2
				  )
				: null,
		}));

		const csv = parse(prData);
		fs.writeFileSync('github_prs.csv', csv);

		callback(undefined, { message: 'GitHub PR data saved to github_prs.csv' });
	} catch (error) {
		callback(undefined, { message: `Error fetching GitHub PRs: ${error.message}` });
	}
};

module.exports = getGithubMetrics;
