'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
const transformStateWithClones = (state, actions) => {
  if (actions.length === 0) {
    return [];
  }

  const stateSequence = [];

  const currentState = structuredClone(state);

  const handlers = {
    addProperties: (s, a) => addProperties(s, a.extraData),
    removeProperties: (s, a) => removeProperties(s, a.keysToRemove),
    clear: (s) => clearProperties(s),
  };

  for (const action of actions) {
    const handler = handlers[action.type];

    if (!handler) {
      throw new Error(`Unknown action type: ${action.type}`);
    }

    handler(currentState, action);
    stateSequence.push(structuredClone(currentState));
  }

  return stateSequence;
};

const addProperties = (state, extraData) => {
  Object.assign(state, extraData);
};

const removeProperties = (state, keysToRemove) => {
  for (const key of keysToRemove) {
    if (Object.hasOwn(state, key)) {
      delete state[key];
    }
  }
};

const clearProperties = (state) => {
  for (const key in state) {
    delete state[key];
  }
};

module.exports = transformStateWithClones;
