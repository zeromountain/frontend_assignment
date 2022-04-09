import { createHooks } from '../createHooks.js';

describe('createHooks test', () => {
  describe('useState', () => {
    it('useState로 state를 만들 수 있다.', () => {
      const { useState } = createHooks(callback);

      function callback() {
        const [a] = useState('foo');
        const [b] = useState('bar');

        return `a: ${a}, b: ${b}`;
      }

      expect(callback()).toBe(`a: foo, b: bar`);
    });

    it('setState를 실행할 경우, callback이 다시 실행된다.', () => {
      const { useState } = createHooks(callback);

      let callCount = 0;

      function callback() {
        const [, setA] = useState('foo');
        callCount += 1;
        return { setA };
      }

      const { setA } = callback();
      expect(callCount).toBe(1);

      setA('test');
      expect(callCount).toBe(2);
    });

    it('state의 값이 이전과 동일할 경우, 다시 실행되지 않는다.', () => {
      const { useState } = createHooks(callback);

      let callCount = 0;

      function callback() {
        const [, setA] = useState('foo');
        callCount += 1;
        return { setA };
      }

      const { setA } = callback();
      expect(callCount).toBe(1);

      setA('test');
      expect(callCount).toBe(2);

      setA('test');
      expect(callCount).toBe(2);
    });

    it('resetContext를 실행해줘야 값이 정상적으로 반영된다.', () => {
      const { useState, resetContext } = createHooks(callback);

      let result = '';

      function callback() {
        resetContext();

        const [a, setA] = useState('foo');
        const [b, setB] = useState('bar');

        result = `a: ${a}, b: ${b}`;

        return { setA, setB };
      }

      const { setA, setB } = callback();

      expect(result).toBe(`a: foo, b: bar`);

      setA('foo-change');

      expect(result).toBe(`a: foo-change, b: bar`);

      setB('bar-change');

      expect(result).toBe(`a: foo-change, b: bar-change`);
    });
  });
});
