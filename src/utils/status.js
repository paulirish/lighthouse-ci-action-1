const fetch = require('node-fetch')
const core = require('@actions/core')

async function postStatus({sha}) {

  const token = core.getInput('secretghtoken');

  const statusPayload = {
    state: 'pending',
    target_url: ' https://lhci-canary.herokuapp.com/app/projects/debugger-protocol-viewer/compare/b9fac0a9-7024-45ae-b4ee-854fd089f460?compareUrl=http%3A%2F%2Flocalhost%3APORT%2Fdevtools-protocol%2Ftot%2FPage%2F',
    description: 'What a great thing',
    context: 'LHCI server',
  };

  const status_url = `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/statuses/${sha}`;

  console.log({statusPayload, status_url});

  // https://developer.github.com/v3/repos/statuses/#create-a-status
  const response = await fetch(status_url, {
    method: 'POST',
    headers: {
      'Authorization': `token ${token}`,
    },
    body: JSON.stringify(statusPayload),
  });

  console.log({response});
  if (!response.ok) {
    const json = await response.json();
    console.error(`Response was not ok. Status: ${response.status}. Body: ${JSON.stringify(json)}`);
  } else {
    console.log('Status posted ok!');
  }
  return;
}
module.exports = { postStatus }
