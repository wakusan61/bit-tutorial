import { ok } from 'node:assert';
import { lib } from './lib.js';

it('renders with the correct text', () => {
  ok(lib() === 'hello world');
});
