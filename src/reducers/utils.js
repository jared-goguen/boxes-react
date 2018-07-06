export const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    const handler = handlers[action.type];
    if (!handler) return state;
    return { ...state, ...handler(state, action) };
  };
};

export const reduceAction = (action) => {
  let reduced = Object.assign({}, action);
  delete reduced.type;
  return reduced;
}


export default { createReducer };
