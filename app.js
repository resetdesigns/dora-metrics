// Grab utils
const getGithubMetrics = require('./utils/getGithubMetrics');
const getAzureDevOpsMetrics = require('./utils/getAzureDevOpsMetrics');
const getJiraMetrics = require('./utils/getJiraMetrics');

// Call GitHub util and retrieve CSV
getGithubMetrics((error, { message } = {}) => {
	if (error) return console.log(error);
	console.log(message);
});

// Call Azure DevOps util and retrieve CSV
getAzureDevOpsMetrics((error, { message } = {}) => {
	if (error) return console.log(error);
	console.log(message);
});

// Call Jira util and retrieve CSV
getJiraMetrics((error, { message } = {}) => {
	if (error) return console.log(error);
	console.log(message);
});
