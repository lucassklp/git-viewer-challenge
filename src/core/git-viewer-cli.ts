import { Observable } from "rxjs";
import { Commit } from "../models/commit";
import { GitCli } from "./git-cli";
import { GitViewer } from "./git-viewer";
import { v4 as uuid } from 'uuid'
import { map, mergeMap, switchMap } from 'rxjs/operators';
import p from 'path'

export class GitCliViewer implements GitViewer {

    getCommits(url: string): Observable<Commit[]> {
        const folder = uuid();
        const path = '.' + p.sep + folder;

        const gitCli = new GitCli();

        return gitCli.clone(url, path).pipe(switchMap(() => {
            gitCli.open(path)
            return gitCli.log('--pretty="format:%H\n%an\n%ct\n%s\n"').pipe(map(log => {
                return log.split('\n\n').map(line => {
                    const value = line.split('\n').map(s => s.trim());
                    return {
                        sha: value[0],
                        message: value[3],
                        date: new Date(parseInt(value[2], 10)),
                        author: value[1]
                    }
                })
            }))
        }))
    }
}