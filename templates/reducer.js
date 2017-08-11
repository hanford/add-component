import t from './actionTypes'

const defaultState = {
  count: 0,
}

const counter = (state = defaultState, action) => {
  switch (action.type) {

    case t.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      }

    default:
      return state
  }
}

export default users
