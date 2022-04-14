let currentObserver = null;
// 학생
export function observe(fn) {
  // console.log('observe 함수 실행');
  currentObserver = fn;
  fn();
  currentObserver = null;
  // console.log('observe 함수 종료');
}

// observable 함수를 통해 생성된 객체
export function observable(obj) {
  Object.keys(obj).forEach((key) => {
    let _value = obj[key]; // obj[a], obj[b]
    const observers = new Set();

    Object.defineProperty(obj, key, {
      get() {
        if (currentObserver) observers.add(currentObserver);
        return _value;
      },
      set(value) {
        // console.log(_value, value);
        _value = value;
        observers.forEach((fn) => fn());
      },
    });
  });
  // console.log(obj);
  return obj;
}
