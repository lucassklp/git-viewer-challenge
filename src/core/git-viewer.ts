import { Observable } from 'rxjs';
import { Commit } from '../models/commit';

export interface GitViewer {
    getCommits(url: string, page: number, pageSize: number): Observable<Commit[]>;
}