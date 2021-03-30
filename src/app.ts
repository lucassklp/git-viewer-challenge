import express from 'express';
import { GitCli } from './core/git-cli';
import fs from 'fs';
import { GitCliViewer } from './core/git-viewer-cli';


const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const viewer = new GitCliViewer();
    viewer.getCommits(req.query.url as string).subscribe(commits => {
        res.send(commits)
    });
})

// tslint:disable-next-line: no-console
app.listen(port, () => console.log(`Server is listening on ${port}`));
