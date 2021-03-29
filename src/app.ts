import express from 'express';
import { v4 as uuid } from 'uuid'
import { GitCli } from './core/git-cli';
import p from 'path'
import fs from 'fs';
import { finalize, take } from 'rxjs/operators';


const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const repo = req.query.url as string;
    const folder = uuid();
    const path = '.' + p.sep + folder;

    const gitCli = new GitCli('.');
    gitCli.clone(repo, path).pipe(
        take(0),
        finalize(() => {
            gitCli.open(path)
            gitCli.log().subscribe(log => {
                res.type('text/plain')
                res.send(log)
            })
        })
    ).subscribe()
})

// tslint:disable-next-line: no-console
app.listen(port, () => console.log(`Server is listening on ${port}`));