// subscriber
export function observe() {}

// publish
export function observable(initialState) {
  // 탐색 목록, state, 구독관리, 구독알림
  const observers = [];
  return {
    state: initialState || null,
    subscribe: (listener) => observers.push(listener) - 1,
    unsubscribe: (idx) => observers.splice(idx, 1),
    notify: (newState) => {
      this.state = newState;
      observers.forEach((observer) => observer(newState));
    },
  };
}
