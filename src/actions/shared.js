import { getInitialData } from "../utils/api";
import {
  receiveQuestions,
  addAnswerToQuestion,
  addQuestion,
} from "./questions";
import { receiveUsers, addAnswerToUser, addQuestionToUser } from "./users";
import { saveQuestion, saveQuestionAnswer } from "../utils/api";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return async (dispatch, getState) => {
    const { authedUser } = getState();

    try {
      const question = await saveQuestion({
        optionOneText,
        optionTwoText,
        author: authedUser,
      });

      dispatch(addQuestion(question));
      dispatch(addQuestionToUser({ author: authedUser, id: question.id }));
    } catch (error) {
      console.error("Error saving question:", error);
    }
  };
}

export const handleAddAnswer =
  (questionID, answer) => async (dispatch, getState) => {
    const { authedUser } = getState();

    try {
      await saveQuestionAnswer({ authedUser, questionID, answer });
      dispatch(addAnswerToQuestion(authedUser, questionID, answer));
      dispatch(addAnswerToUser(authedUser, questionID, answer));
    } catch (error) {
      console.log(error);
    }
  };
