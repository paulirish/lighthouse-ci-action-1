const github = require('@actions/github')
const core = require('@actions/core')

async function run() {
  // ghtoken: ${{ secrets.GITHUB_TOKEN }}
  // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token
  const myToken = core.getInput('ghtoken')

  const octokit = new github.GitHub(myToken)

  const check = octokit.checks.create({
    owner: process.env.GITHUB_REPOSITORY.split('/')[0],
    repo: process.env.GITHUB_REPOSITORY.split('/')[1],
    head_sha: process.env.GITHUB_SHA,
    name: 'LH Report',
    output: {
      title: 'whaddup title',
      summary: 'hey summary',
      text: `
#### best markdown ever

really fine stuff.
            `,
      images: [
        {
          alt: 'alt of image',
          image_url: 'https://paulirish.com/avatar150.jpg',
          caption: 'cool GUY'
        }
      ]
    }
  })

  console.log(check)


  const status = await octokit.repos.getCombinedStatusForRef({
    owner: process.env.GITHUB_REPOSITORY.split('/')[0],
    repo: process.env.GITHUB_REPOSITORY.split('/')[1],
    ref: process.env.GITHUB_SHA,
  });
  console.log(status);
}

module.exports = {
    run
};