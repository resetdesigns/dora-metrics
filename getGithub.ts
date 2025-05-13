import axios from 'axios';
import { parse } from 'json2csv';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';
const REPO = 'org/repo';
const API_URL = `https://api.github.com/repos/${REPO}/pulls?state=closed&per_page=100`;

const fetchGitHubPRs = async () => {
	try {
		const response = await axios.get(API_URL, {
			headers: { Authorization: `token ${GITHUB_TOKEN}` },
		});

		const prData = response.data.map((pr: any) => ({
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
		console.log('GitHub PR data saved to github_prs.csv');
	} catch (error) {
		console.error('Error fetching GitHub PRs:', error.message);
	}
};

// fetchGitHubPRs();

console.log(process.env.GITHUB_TOKEN);
