import { exec } from 'child_process';
import { Observable } from 'rxjs';

export class Cli {
    private _cwd: string;

    constructor(cwd?: string) {
        this._cwd = cwd || '.';
    }

    public cwd(cwd: string) {
        this._cwd = cwd;
    }

    public run(command: string): Observable<string> {
        return new Observable(obs => {
            const process = exec(command, { cwd: this._cwd })
            process.stdout.on('data', data => {
                obs.next(data.toString())
            });
            process.stderr.on('data', data => {
                obs.error(data.toString())
            });
            process.on('close', (code) => {
                obs.complete();
            })
        })
    }
}