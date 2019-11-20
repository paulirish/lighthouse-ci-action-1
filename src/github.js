const github = require('@actions/github')
const core = require('@actions/core')

async function run() {
  // ghtoken: ${{ secrets.GITHUB_TOKEN }}
  // https://help.github.com/en/actions/automating-your-workflow-with-github-actions/authenticating-with-the-github_token
  const myToken = core.getInput('ghtoken')

  const octokit = new github.GitHub(myToken)

  const check = await octokit.checks.create({
    owner: process.env.GITHUB_REPOSITORY.split('/')[0],
    repo: process.env.GITHUB_REPOSITORY.split('/')[1],
    head_sha: process.env.GITHUB_SHA,
    name: 'LH Report',
    status: 'completed',
    conclusion: 'neutral',
    output: {
      title: 'whaddup title',
      summary: `
## this is the summary

**CTC format**: The [Chrome extension & Chrome app i18n format](https://developer.chrome.com/extensions/i18n-messages) with some minor changes. JSON with their specified model for declaring placeholders, examples, etc. Used as an interchange data format.
* **LHL syntax** (Lighthouse Localizable syntax): The ICU-friendly string syntax that is used to author \`UIStrings\` and is seen in the locale files in \`i18n/locales/*.json\`. Lighthouse has a custom syntax these strings combines many ICU message features along with some markdown.
* **ICU**: ICU (International Components for Unicode) is a localization project and standard defined by the Unicode consortium. In general, we refer to "ICU" as the [ICU message formatting](http://userguide.icu-project.org/formatparse/messages) syntax.

# The Lighthouse i18n pipeline

The translation pipeline has 3 distinct stages, the Collection done at build time, the Translation done in the Google TC pipeline, and the Replacement done at runtime.

The collection and translation pipeline:
\`\`\`
 Source files:                                         Locale files:
+---------------------------+                         +----------------------------------------------
|                           ++                        | lighthouse-core/lib/i18n/locales/en-US.json |
| const UIStrings = { ... };|-+                 +---> | lighthouse-core/lib/i18n/locales/en-XL.json |
|                           |-|                 |     +----------------------------------------------+
+-----------------------------|                 |     |                                             ||
 +----------------------------|                 |     | lighthouse-core/lib/i18n/locales/*.json     |-<+
  +---------------------------+                 |     |                                             || |
                           |                    |     +----------------------------------------------| |
  $ yarn                   |                    |      +---------------------------------------------+ |
      i18n:collect-strings +--------------------+                                                      |
                           |                                                                           |
                           v                          ▐                       ▐    +---------------+   |
              +------------+------+                   ▐   Google TC Pipeline  ▐ +->|  *.ctc.json   |---+
              |  en-US.ctc.json   |  +--------------> ▐      (~2 weeks)       ▐    +---------------+
              +-------------------+  $ g3/import….sh  ▐                       ▐ $ g3/export….sh
\`\`\`

COOL.

`,
      text: `
## this is the details

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
}

module.exports = {
  run
}
