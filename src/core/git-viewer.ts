import { Observable } from "rxjs";
import { Commit } from "../models/commit";

export interface GitViewer {
    getCommits(url: string): Observable<Commit[]>;
}