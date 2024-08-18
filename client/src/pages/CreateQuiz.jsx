import { useEffect, useRef, useState } from "react";
import Header from "../components/Header";

const CreateQuiz = () => {
  const [data, setData] = useState([]);
  const [rightAnswer, setRightAnswer] = useState([false, false, false, false]);
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionRef = useRef();
  const answer1Ref = useRef();
  const answer2Ref = useRef();
  const answer3Ref = useRef();
  const answer4Ref = useRef();

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value);
  };
  const handleRightAnswerChange = (val) => {
    const newRightAnswer = [false, false, false, false];
    newRightAnswer[val] = true;
    setRightAnswer(newRightAnswer);
  };
  const handlePrev = () => {
    setCurrentQuestion((prev) => prev - 1);
    setRightAnswer(data[currentQuestion])
  };
  const handleNext = () => {
    if (rightAnswer.indexOf(true) != -1) {
      const newQuestion = {
        question: questionRef.current.value,
        answers: [
          answer1Ref.current.value,
          answer2Ref.current.value,
          answer3Ref.current.value,
          answer4Ref.current.value,
        ],
        correct: rightAnswer.indexOf(true),
      };
      if (currentQuestion == data.length) {
        setData([...data, newQuestion]);
        console.log(data);
      } else {
        setData((prev) =>
          prev.map((question, index) =>
            index == currentQuestion ? newQuestion : question
          )
        );
      }
      setRightAnswer(-1);
      setCurrentQuestion((prev) => prev + 1);
    }
  };
  return (
    <>
      <Header />
      <div id="createQuiz">
        <div id="createQuizHeader">
          <div className="flex-direction-column">
            <label>Name: </label>
            <input placeholder="Quiz name" />
          </div>
          <div className="flex-direction-column">
            <label>Category: </label>
            <select onChange={handleCategoryChange}>
              <option hidden>Select the category</option>
              <option value={"Math"}>Math</option>
              <option value={"Chemistry"}>Chemistry</option>
              <option value={"Physics"}>Physics</option>
              <option value={"Geography"}>Geography</option>
              <option value={"Computer science"}>Computer science</option>
            </select>
          </div>
          <div className="flex-direction-column">
            <label>Description: </label>
            <textarea placeholder="Description" />
          </div>
          <div className="flex-direction-column">
            <label>Difficulty:</label>
            <select onChange={handleDifficultyChange}>
              <option hidden>Select the difficulty</option>
              <option value={"Easy"}>Easy</option>
              <option value={"Medium"}>Medium</option>
              <option value={"Hard"}>Hard</option>
            </select>
          </div>
        </div>
        <div id="createQuizBody">
          <div className="flex-direction-column">
            <label>QUESTION</label>
            <input
              placeholder="Question"
              ref={questionRef}
              defaultValue={
                data[currentQuestion]?.question &&
                data[currentQuestion].question
              }
              key={`q${currentQuestion}`}
            />
          </div>
          <div className="flex-direction-column">
            <label>Answer 1</label>
            <div>
              <button
                className={rightAnswer[0] ? "radio right-radio" : "radio"}
                onClick={() => handleRightAnswerChange(0)}
              ></button>
              <input
                placeholder="Answer 1"
                ref={answer1Ref}
                defaultValue={
                  data[currentQuestion]?.answers[0] &&
                  data[currentQuestion].answers[0]
                }
                key={`a1${currentQuestion}`}
              />
            </div>
          </div>
          <div className="flex-direction-column">
            <label>Answer 2</label>
            <div>
              <button
                className={rightAnswer[1] ? "radio right-radio" : "radio"}
                onClick={() => handleRightAnswerChange(1)}
              ></button>
              <input
                placeholder="Answer 2"
                ref={answer2Ref}
                defaultValue={
                  data[currentQuestion]?.answers[1] &&
                  data[currentQuestion].answers[1]
                }
                key={`a2${currentQuestion}`}
              />
            </div>
          </div>
          <div className="flex-direction-column">
            <label>Answer 3</label>
            <div>
              <button
                className={rightAnswer[2] ? "radio right-radio" : "radio"}
                onClick={() => handleRightAnswerChange(2)}
              ></button>
              <input
                placeholder="Answer 3"
                ref={answer3Ref}
                defaultValue={
                  data[currentQuestion]?.answers[2] &&
                  data[currentQuestion].answers[2]
                }
                key={`a3${currentQuestion}`}
              />
            </div>
          </div>
          <div className="flex-direction-column">
            <label>Answer 4</label>
            <div>
              <button
                className={rightAnswer[3] ? "radio right-radio" : "radio"}
                onClick={() => handleRightAnswerChange(3)}
              ></button>
              <input
                placeholder="Answer 4"
                ref={answer4Ref}
                defaultValue={
                  data[currentQuestion]?.answers[3] &&
                  data[currentQuestion].answers[3]
                }
                key={`a4${currentQuestion}`}
              />
            </div>
            <div>
                {currentQuestion}
              <button onClick={handlePrev} disabled={currentQuestion ? false : true}>Prev</button>
              <button onClick={handleNext}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateQuiz;
