export function createHooks(callback) {
  const options = {
    key: 0,
    states: [],
  };
  // useState는 초기값을 입력받는다.
  // useState는 상태값과 상태값을 변경하는 함수를 반환한다.
  function useState(initialState) {
    const { key, states } = options;

    if (states.length === key) states.push(initialState);
    const state = states[key];

    const setState = (newState) => {
      if (states[key] === newState) return;
      states[key] = newState;
      callback();
    };
    options.key += 1;
    return [state, setState];
  }

  function resetContext() {
    options.key = 0;
  }

  return { useState, resetContext };
}
