const { _saveQuestion } = require("./_DATA");
const { _saveQuestionAnswer } = require("./_DATA");
const { _getUsers } = require("./_DATA");
const { _getQuestions } = require("./_DATA");

describe("_saveQuestion", () => {
  it("should return the saved question with all expected fields populated when correctly formatted data is passed", async () => {
    const question = {
      optionOneText: "Option One",
      optionTwoText: "Option Two",
      author: "sarahedo",
    };

    const savedQuestion = await _saveQuestion(question);

    expect(savedQuestion).toHaveProperty("id");
    expect(savedQuestion).toHaveProperty("timestamp");
    expect(savedQuestion).toHaveProperty("author", question.author);
    expect(savedQuestion).toHaveProperty("optionOne");
    expect(savedQuestion.optionOne).toHaveProperty("votes", []);
    expect(savedQuestion.optionOne).toHaveProperty(
      "text",
      question.optionOneText
    );
    expect(savedQuestion).toHaveProperty("optionTwo");
    expect(savedQuestion.optionTwo).toHaveProperty("votes", []);
    expect(savedQuestion.optionTwo).toHaveProperty(
      "text",
      question.optionTwoText
    );
  });

  it("should return an error if incorrect data is passed to the function", async () => {
    const incorrectQuestion = {
      optionOneText: "Option One",
      author: "sarahedo",
    };

    await expect(_saveQuestion(incorrectQuestion)).rejects.toEqual(
      "Please provide optionOneText, optionTwoText, and author"
    );
  });
});

describe("_saveQuestionAnswer", () => {
  it("should return the saved answer to question with all expected fields populated when correctly formatted data is passed", async () => {
    const users = await _getUsers();
    const questions = await _getQuestions();
    const authedUser = "sarahedo";
    const questionID = "8xf0y6ziyjabvozdd253nd";
    const answer = "optionOne";

    await _saveQuestionAnswer({
      authedUser,
      questionID,
      answer,
    });

    expect(users[authedUser].answers[questionID]).toBe(answer);
    expect(questions[questionID][answer].votes).toContain(authedUser);
  });

  it("should return an error if incorrect data is passed to the function", async () => {
    const authedUser = "sarahedo";
    const questionID = "8xf0y6ziyjabvozdd253nd";

    await expect(
      _saveQuestionAnswer({ authedUser, questionID })
    ).rejects.toEqual("Please provide authedUser, qid, and answer");
  });
});
