import { from, Observable } from 'rxjs';
import { Commit } from '../models/commit';
import { GitViewer } from './git-viewer';
import axios from 'axios';
import { map } from 'rxjs/operators';
import { extract } from './github-url-metadata';
export class GitHubApiViewer implements GitViewer {
    getCommits(url: string, page: number, pageSize: number): Observable<Commit[]> {
        const metadata = extract(url);
        return from(axios.get(`https://api.github.com/repos/${metadata.owner}/${metadata.repository}/commits`, {
            params: {
                per_page: pageSize,
                page: page + 1
            }
            })).pipe(map(response => {
            return response.data.map(node => {
                return {
                    sha: node.sha,
                    author: node.commit.committer.name,
                    message: node.commit.message,
                    date: new Date(node.commit.committer.date)
                };
            });
        }));
    }
}