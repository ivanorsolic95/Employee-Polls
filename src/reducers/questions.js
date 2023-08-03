import {
  RECEIVE_QUESTIONS,
  ADD_ANSWER_TO_QUESTION,
  ADD_QUESTION,
} from "../actions/questions";

export function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_ANSWER_TO_QUESTION:
      return {
        ...state,
        [action.questionID]: {
          ...state[action.questionID],
          [action.answer]: {
            ...state[action.questionID][action.answer],
            votes: state[action.questionID][action.answer].votes.concat(
              action.authedUser
            ),
          },
        },
      };

    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    default:
      return state;
  }
}
