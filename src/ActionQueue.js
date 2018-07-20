export class ActionQueue {
  constructor() {
    this.actions = [];
    this.processing = false;
  }

  register(dispatch, action) {
    this.actions.push(action);
    // console.log(`Action ${action.type} (${action._timeout}) was registered...`);
    if (!this.processing) {
      this.process(dispatch);
    } else {
      if (this.actions.length === 0) {
        throw 'No actions in queue, but still processing' // shouldn't happen...
      }
    }
  }

  _process(dispatch) {
    // console.log(`Actions in queue: ${this.actions.length}`);
    const action = this.actions.shift();

    if (action === undefined) {
      this.processing = false;
      // console.log('Processing complete.')
      return;
    } 

    // console.log(`Processing ${action.type}...`);

    action._enqueue = false;
    action._delayed = true;
    dispatch(action);
    // console.log(`Setting timeout (${action._timeout})...`);
    setTimeout(() => {
      // console.log('Timeout is done...')
      this._process(dispatch);
    }, action._timeout);
  }

  process(dispatch) {
    if (this.processing) {
      console.log('Warning: ActionQueue already processing...');
      return;
    }

    this.processing = true;
    // console.log('Lauching processing...');
    this._process(dispatch);
  }
}

const initialState = {
  default: new ActionQueue()
}
export function queueReducer(state=initialState, action) {return state}

export function createAction(dispatch, action, timeout, queueName='default') {
  action._enqueue = true;
  action._queueName = queueName;
  action._timeout = timeout;
  dispatch(action);
} 

export function aque({ dispatch, getState }) {
  return next => action => {
    // console.log(getState());
    // console.log(`Handling ${action.type || action}...`);
    // console.log(action);

    if (typeof action == 'function') {
      action(dispatch);
      return { type: 'FORWARD_ACTION' };
    }

    if (action._enqueue) {
      const queueReducer = getState().queueReducer;
      let queue = queueReducer[action._queueName];

      if (queue === undefined) {
        queue = queueReducer[action._queueName] = new ActionQueue();
      }

      // console.log(`Registering ${action.type}...`);
      queue.register(dispatch, action);
      // console.log(`Dispatching DELAYED_ACTION...`);
      return { type: 'DELAYED_ACTION' };
    } else {
      // console.log(`Dispatching ${action.type}...`);
      return next(action);
    }
  }
}
