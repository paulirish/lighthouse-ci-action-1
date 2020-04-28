const fetch = require('node-fetch')
const core = require('@actions/core')
const { getLinksByUrl } = require('./lhci-helpers')


// TODO: use runGithubStatusCheck() somehow? https://github.com/GoogleChrome/lighthouse-ci/blob/2015def21a190435e32227897ce36338055db88b/packages/cli/src/upload/upload.js#L196

async function postStatus({sha, resultsPath}) {

  const token = core.getInput('secretghtoken');
  const linksByUrl = await getLinksByUrl(resultsPath)

  const statusPayload = {
    state: 'pending',
    target_url: 'https://lhci-canary.herokuapp.com/app/projects/debugger-protocol-viewer/compare/b9fac0a9-7024-45ae-b4ee-854fd089f460?compareUrl=http%3A%2F%2Flocalhost%3APORT%2Fdevtools-protocol%2Ftot%2FPage%2F',
    description: 'What a great thing',
    context: 'LHCI server',
  };

  const status_url = `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/statuses/${sha}`;

  // https://developer.github.com/v3/repos/statuses/#create-a-status
  const response = await fetch(status_url, {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
    },
    body: JSON.stringify(statusPayload),
  });

  if (response.ok) return console.log('Status posted.');

  const json = await response.json();
  console.error(`Response was not ok. Status: ${response.status}. Body: ${JSON.stringify(json)}`);
}
module.exports = { postStatus }
