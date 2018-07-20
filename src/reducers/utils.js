export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
	console.log(state)
	console.log(action)
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
