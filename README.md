# Gather DORA/SPACE Style Metrics

Pull software engineering metrics from Github, Azure DevOps, and Jira to aggregate data to review team production, predictability, and used to review DORA/SPACE style metrics. The goal is to understand if there any process or system blockers that are causing inefficiencies.

# Environment vars

This project uses the following environment variables:

```
#Github
GITHUB_TOKEN=your-github-token
GITHUB_REPO=org/repo

#Azure DevOps
ADO_ORG=your_organization
ADO_PROJECT=your_project
ADO_PIPELINE_ID=your_pipeline_id
ADO_PAT=your_personal_access_token

#Jira
JIRA_URL=https://your-domain.atlassian.net
JIRA_EMAIL=your-email@example.com
JIRA_TOKEN=your-api-token
JIRA_PROJECT_KEY=your-jira-project-key
```

# Pre-requisites

-   Install [Node.js](https://nodejs.org/en/)

# Getting started

-   Clone the repository

```
git clone  <github template url> <project_name>
```

-   Install dependencies

```
cd <project_name>
npm install
```

-   Run the project

```
node app.js
```

# TypeScript + Node

The main purpose of this repository is to show a project that pulls data from various developer systems and exports them into CSV for review.

## Getting TypeScript

Add Typescript to project `npm`.

```
npm install -D typescript
```

## Project Structure

The folder structure of this app is explained below:

| Name             | Description                   |
| ---------------- | ----------------------------- | --- |
| **node_modules** | Contains all npm dependencies |
| **utils**        | Utilities used to fetch data  |     |
| **root**/app.js  | Contains application config   |
| package.json     | Contains npm dependencies     |

### Running tests using NPM Scripts

```
npm run test

```

`NOT CONFIGURED` Test files have not been created. This is placeholder.

# TSLint

TSLint is a code linter that helps catch minor code quality and style issues.

`NOT CONFIGURED` Test files have not been created. This is placeholder.

## TSLint rules

All rules are configured through `tslint.json`.

## Running TSLint

To run TSLint you can call the main build script or just the TSLint task.

```
npm run build:live   // runs full build including TSLint
npm run lint  // runs only TSLint
```

# Common Issues

## None

There are no common issues reported at this time.
