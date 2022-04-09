export function createHooks(callback) {
  // useState는 초기값을 입력받는다.
  // useState는 상태값과 상태값을 변경하는 함수를 반환한다.
  function useState(initialState) {
    let state = initialState;
    const setState = (newState) => {
      if (state === newState) return;
      state = newState;
      callback(); // callback 함수가 render 함수의 역할을 한다.
    };
    return [state, setState];
  }

  function resetContext() {
    useState('');
  }

  return { useState, resetContext };
}
