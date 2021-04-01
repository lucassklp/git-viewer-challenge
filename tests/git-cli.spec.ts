import { expect } from 'chai';
import rimraf from "rimraf";
import { GitCli } from '../src/core/git-cli';
import fs from "fs"
import {v4 as uuid} from 'uuid'

function deleteFolderIfExist(path: string){
    if(fs.existsSync(path)){
        rimraf.sync(path)
    }
}

describe('Git Cli Tests', () => {
    it("should clone the repository to current folder", () => {
        const cli = new GitCli();
        const path = __dirname + uuid();
        deleteFolderIfExist(path);
        cli.clone('https://github.com/lucassklp/Rx.Http.git', path).subscribe(output => {
            const hasDirectory = fs.existsSync(path)
            expect(hasDirectory).to.be.true;
            deleteFolderIfExist(path);
        })
    });

    it("should clone and log a repository", () => {
        const cli = new GitCli();
        const path = __dirname + '/' + uuid();
        deleteFolderIfExist(path);
        cli.clone('https://github.com/lucassklp/Rx.Http.git', path).subscribe(output => {
            cli.open(path);
            cli.log().subscribe(log => {
                expect(log).to.be.not.null;
                deleteFolderIfExist(path);
            })
        })
    });
});