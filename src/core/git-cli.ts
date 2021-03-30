import { Observable } from 'rxjs';
import { Cli } from './cli';

export class GitCli {

    private cli: Cli;

    constructor(){
        this.cli = new Cli();
    }

    clone(remote: string, relativePath: string): Observable<void> {
        return new Observable(obs => {
            this.cli.run(`git clone ${remote} ${relativePath} --quiet`).subscribe({
                complete: () => obs.next()
            })
        });
    }

    log(args?: string): Observable<string> {
        return this.cli.run(`git log ${args || ''}`)
    }

    public open(directory: string){
        return this.cli.cwd(directory);
    }
}