import './setup';
import { Storage } from '../src/index';

describe('storage', () => {
  it('should have some tests', () => {
    var s = new Storage();
    expect(s).toBe(s);
  });

  describe('store', () => {
    it('should store in browser page state', () => {
      var state = { 'number': 123 };
      var s = new Storage();
      s.store('-page', 'TestState', state);
    //   expect(s.retrieve('-page', 'TestState')['number']).toBe(123);
    });

    it('should store in sessionStorage', () => {
      var state = { 'number': 456 };
      var s = new Storage();
      s.store('-session', 'TestState', state);
    //   expect(s.retrieve('-session', 'TestState')['number']).toBe(456);
    });

    it('should store in localStorage', () => {
      var state = { 'number': 789 };
      var s = new Storage();
      s.store('-local', 'TestState', state);
    //   expect(s.retrieve('-local', 'TestState')['number']).toBe(789);
    });
  });

  describe('retrieve', () => {
    it('should retrieve from browser page state', () => {
      var s = new Storage();
      expect(s.retrieve('-page', 'TestState')['number']).toBe(123);
    });

    it('should retrieve from sessionStorage', () => {
      var s = new Storage();
      expect(s.retrieve('-session', 'TestState')['number']).toBe(456);
    });

    it('should retrieve from localStorage', () => {
      var s = new Storage();
      expect(s.retrieve('-local', 'TestState')['number']).toBe(789);
    });
  });

  describe('remove', () => {
    it('should remove from browser page state', () => {
      var s = new Storage();
      s.remove('-page', 'TestState');
      expect(s.retrieve('-page', 'TestState')).toBe(null);
    });

    it('should remove from sessionStorage', () => {
      var s = new Storage();
      s.remove('-session', 'TestState');
      expect(s.retrieve('-session', 'TestState')).toBe(null);
    });

    it('should retrieve from localStorage', () => {
      var s = new Storage();
      s.remove('-local', 'TestState');
      expect(s.retrieve('-local', 'TestState')).toBe(null);
    });
  });
});
