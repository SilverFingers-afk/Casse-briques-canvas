import test from 'node:test';
import assert from 'node:assert/strict';
import { overlaps } from './game.js';

test('une intersection est détectée', () => { 
  const a = {x: 0, y: 0, w: 10, h: 10};
  const b = {x: 9, y: 0, w: 10, h: 10};
  assert.equal(overlaps(a, b), true);
});

test('une intersection est détectée', () => { 
  const a = {x: 0, y: 0, w: 10, h: 10};
  const b = {x: 10, y: 0, w: 10, h: 10};
  assert.equal(overlaps(a, b), false);
});