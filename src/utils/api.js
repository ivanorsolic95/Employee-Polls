import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

export async function getInitialData() {
  const [users, questions] = await Promise.all([_getUsers(), _getQuestions()]);
  return {
    users,
    questions,
  };
}

export async function saveQuestion(question) {
  const result = await _saveQuestion(question);
  return result;
}
export async function saveQuestionAnswer({ authedUser, questionID, answer }) {
  const result = await _saveQuestionAnswer({ authedUser, questionID, answer });
  return result;
}
