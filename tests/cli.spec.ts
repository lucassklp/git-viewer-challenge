import { Cli } from '../src/core/cli';
import { expect } from 'chai';
import { EOL } from 'os';

describe('Cli Tests', () => {

    it("should get a 'hello world' message from stdin", () => {
        const cli = new Cli();
        cli.run('echo hello world').subscribe(output => {
            expect(output).equal('hello world' + EOL); // echo prints a new line at end by default
        });
    });

    it("should get a 'error' message from stderr", () => {
        const cli = new Cli();
        cli.run('echo error>&2').subscribe(_ => {
            throw new Error();
        }, err => {
            expect(err).equal('error' + EOL)
        });
    });

    it("should get a 'command not found' message from stderr", () => {
        const cli = new Cli();
        cli.run('this_command_do_not_exists').subscribe(_ => {
            throw new Error();
        }, err => {
            expect(err).not.null
        })
    });

    it('should change cwd to current folder', () => {
        const cli = new Cli();
        cli.cwd(__dirname)
        cli.run('pwd').subscribe(output => {
            expect(output).equal(__dirname + EOL)
        });
    });
});