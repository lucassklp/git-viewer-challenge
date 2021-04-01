import { Observable } from "rxjs";
import { Commit } from "../models/commit";
import { GitCli } from "./git-cli";
import { GitViewer } from "./git-viewer";
import { v4 as uuid } from 'uuid'
import { map, mergeMap, switchMap } from 'rxjs/operators';
import os from 'path'
import { extract } from "./github-url-metadata";

export class GitHubCliViewer implements GitViewer {

    getCommits(url: string, page: number, pageSize: number): Observable<Commit[]> {
        const folder = uuid();
        const path = '.' + os.sep + folder;
        const metadata = extract(url);
        const remote = `https://github.com/${metadata.owner}/${metadata.repository}.git`

        const gitCli = new GitCli();
        return gitCli.clone(remote, path).pipe(switchMap(() => {
            gitCli.open(path)
            const params = `--skip=${page * pageSize} -n ${pageSize} --pretty="format:sha:%H%nauthor:%an%ndate:%ct%nmsg:%s%n"`;
            return gitCli.log(params).pipe(map(log => {
                return log.split('\n\n').map(commit => {
                    const regex = /sha:(.*)[\n]author:(.*)[\n]date:(.*)[\n]msg:(.*)/gy;
                    const groups = regex.exec(commit)
                    return {
                        sha: groups[1],
                        author: groups[2],
                        date: new Date(parseInt(groups[3], 10)),
                        message: groups[4],
                    }
                })
            }))
        }));
    }
}
