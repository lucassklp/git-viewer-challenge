import { Observable } from 'rxjs';
import { Cli } from './cli';

export class GitCli extends Cli {

    constructor(cwd: string){
        super(cwd)
    }

    clone(remote: string, relativePath: string): Observable<string> {
        return this.run(`git clone ${remote} ${relativePath} --quiet`)
    }

    log(args?: string): Observable<string> {
        return this.run(`git log ${args || ''}`)
    }

    public open(directory: string){
        return super.cwd(directory);
    }
}