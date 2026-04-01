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

  for (const action of actions) {
    const { type } = action;

    if (type === 'addProperties') {
      addProperties(currentState, action.extraData);
    }

    if (type === 'removeProperties') {
      removeProperties(currentState, action.keysToRemove);
    }

    if (type === 'clear') {
      clearProperties(currentState);
    }

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
