import { Cli } from '../src/core/cli'
import { expect } from 'chai';
import { EOL } from 'os';

describe('Cli Tests', () => {

    it("should get a 'hello world' message from stdin", () => {
        const cli = new Cli();
        cli.run('echo hello world').subscribe(output => {
            expect(output).equal('hello world' + EOL) // echo prints a new line at end by default
        })
    });

    it("should get a 'error' message from stderr", () => {
        const cli = new Cli();
        cli.run('echo error>&2').subscribe(output => {
            throw new Error();
        }, err => {
            expect(err).equal('error' + EOL)
        })
    });

    it("should get a 'command not found' message from stderr", () => {
        const cli = new Cli();
        cli.run('this_command_do_not_exists').subscribe(output => {
            throw new Error();
        }, err => {
            expect(err).not.null
        })
    });
});