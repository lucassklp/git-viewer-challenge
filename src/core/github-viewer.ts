import { from, Observable } from "rxjs";
import { Commit } from "../models/commit";
import { GitViewer } from "./git-viewer";
import axios from 'axios'
import { map } from "rxjs/operators";
import { extract } from './github-url-metadata';

export class GithubViewer implements GitViewer {
    getCommits(url: string, page: number, pageSize: number): Observable<Commit[]> {
        const metadata = extract(url);
        return from(axios.get(`https://api.github.com/repos/${metadata.owner}/${metadata.repository}/commits`, {
            params: {
                per_page: pageSize,
                page
            }
            })).pipe(map(response => {
            return response.data.map(node => {
                return {
                    sha: node.sha,
                    message: node.commit.message,
                    date: node.commit.committer.date,
                    author: node.commit.committer.name
                }
            });
        }));
    }
}