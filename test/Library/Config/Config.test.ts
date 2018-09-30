import { Config } from '../../../src/Library';

describe('Config', () => {
  describe('constructor()', () => {

  });

  describe('.merge()', () => {
    it('should merge given data to currently assigned data', () => {
      class Fbb {}

      class Pbb {}

      const whatever = {
        difficult: new Map<any, any>([
          [ 'hello', { a: { b: 'c', d: 'e' } } ],
          [
            Config, new Map<any, any>([
              [
                Fbb,
                {
                  fattenMeUp: [ 'Hamburgers', 'Milkshakes' ],
                  downgradeMe: 9,
                  dontTouchMe: 9,
                  replaceMe: true,
                  hello: {
                    you: 'fool',
                    I: 'love you',
                    come: 'on my face',
                  },
                },
              ],
            ]),
          ],
        ]),
        animals: {
          cat: [ 'fluffer' ],
        },
        people: {
          raphaela: {
            hasMinions: true,
            hasCuteness: true,
            properties: [ 'soft', 'weird', 'pretty', 'clever', 'emotional' ],
          },
        },
      };

      const config = new Config(whatever);

      config.merge({
        difficult: new Map<any, any>([
          [ 'hello', { a: { b: 'x', f: 'g' } } ],
          [
            Config, new Map<any, any>([
              [ Pbb, { edgy: 'as fuck' } ],
              [
                Fbb,
                {
                  fattenMeUp: [ 'Hamburgers', 'Fries', 'Scatty' ],
                  downgradeMe: 0,
                  replaceMe: false,
                  hello: {
                    come: 'join',
                    the: 'joyride',
                  },
                },
              ],
            ]),
          ],
        ]),
        animals: {
          cat: false,
        },
        people: {
          wesley: {
            hasMinions: false,
            hasCuteness: true,
          },
          raphaela: {
            hasCuteness: false,
            properties: [ 'married' ],
          },
        },
      });

      const fbb = config.of<any>('difficult').get(Config).get(Fbb);

      expect(fbb.hello).toEqual({ you: 'fool', I: 'love you', come: 'join', the: 'joyride' });
      expect(fbb.dontTouchMe).toBe(9);
      expect(fbb.downgradeMe).toBe(0);
      expect(fbb.replaceMe).toBe(false);
      expect(fbb.fattenMeUp).toEqual([ 'Hamburgers', 'Milkshakes', 'Fries', 'Scatty' ]);
      expect(config.of<any>('difficult').get(Config).get(Pbb)).toEqual({ edgy: 'as fuck' });
      expect(config.of<any>('difficult').get('hello')).toEqual({ a: { b: 'x', d: 'e', f: 'g' } });
      expect(config.of<any>('animals').cat).toBe(false);
      expect(config.of<any>('people').raphaela.hasMinions).toBe(true);
      expect(config.of<any>('people').raphaela.hasCuteness).toBe(false);
      expect(config.of<any>('people').raphaela.properties).toEqual([
        'soft',
        'weird',
        'pretty',
        'clever',
        'emotional',
        'married',
      ]);
    });
  });
});
