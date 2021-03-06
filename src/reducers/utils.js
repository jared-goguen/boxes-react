export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
	// console.log(state, action)
    const handler = handlers[action.type];
    if (!handler) return state;
    return { ...state, ...handler(state, action) };
  };
};

export const forwardAction = (state, action) => {
  let reduced = Object.assign({}, action);
  delete reduced.type;
  return reduced;
}

export const combineStates = (initialState, testState) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return Object.assign(initialState, testState || {});
  }
  return initialState;
}