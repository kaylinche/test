const { Octokit } = require("@octokit/core");

var gitUrl = process.env.GIT_URL.toString().split("/");
var gitHost = "https://api."+gitUrl[2]
var releaseName = process.env.RELEASE_NAME+"-"+process.env.CLOUDCI_GIT_COMMIT

const octokit = new Octokit({
  auth: "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",
  baseUrl: `${gitHost}/`,
});

octokit
  .request("POST repos/{owner}/{repo}/releases", {
    owner: gitUrl[3],
    repo: gitUrl[4].replace(".git",""),
    target_commitish: process.env.CLOUDCI_GIT_COMMIT,
    tag_name: releaseName,
    name: releaseName,
    draft: false,
    prerelease: false,
    generate_release_notes: false,
  });
