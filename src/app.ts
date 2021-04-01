import express from 'express';
import { param, query, validationResult } from 'express-validator';
import { GitViewer } from './core/git-viewer';
import { GitHubCliViewer } from './core/github-cli-viewer';
import { githubRegex } from './core/github-url-metadata';
import { GitHubApiViewer } from './core/github-api-viewer';

const app = express();
const port = 3000;

app.get('/',
    query('url').matches(githubRegex),
    query('page').isNumeric(),
    query('pageSize').isNumeric(),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const url = req.query.url as string;
    const page = parseInt(req.query.page as string, 10);
    const pageSize = parseInt(req.query.pageSize as string, 10);

    let viewer: GitViewer = new GitHubApiViewer();
    viewer.getCommits(url, page, pageSize).subscribe(commits => {
        res.send(commits);
    }, err => {
      viewer = new GitHubCliViewer();
      viewer.getCommits(url, page, pageSize).subscribe(commits => {
        res.send(commits);
      }, error => {
        res.status(500).send([err.message, error]);
      });
    });
})

// tslint:disable-next-line: no-console
app.listen(port, () => console.log(`Server is listening on ${port}`));
