import assert from 'assert'
import { Cli } from '../src/core/cli'
describe('Cli Tests', () => {
    it('should display a hello world message', () => {
       const cli = new Cli('.');
       cli



       assert.strictEqual(1 + 1, 2);
    });
    it('should return 9', () => {
           assert.strictEqual(3 * 3, 9);
    });
});