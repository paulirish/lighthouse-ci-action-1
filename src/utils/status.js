const fetch = require('node-fetch')

function postStatus() {
  // https://developer.github.com/v3/repos/statuses/#create-a-status
  fetch(`https://api.github.com/repos/unsplash/unsplash-web/statuses/${sha}`, {
    method: 'POST',
    headers: {
      [requestHeaders.AUTHORIZATION_REQUEST_HEADER]: `token ${buildTrackerGithubToken}`,
      [requestHeaders.CONTENT_TYPE_REQUEST_HEADER]: ContentType.Json,
    },
    body: JSON.stringify({
      state,
      target_url: targetUrl,
      description,
      context: 'Build Tracker',
    }),
  }).then((response) =>
    response.ok === false
      ? response.json().then((json) => {
          throw new Error(`Response was not ok. Status: ${response.status}. Body: ${JSON.stringify(json)}`)
        })
      : Promise.resolve()
  )
}
module.exports = { postStatus }
