import { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Input,
  DialogFooter,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom"

const Modal = () => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false);
  const [marks, setMarks] = useState(0);

  const [answers, setAnswers] = useState({
    question1Score: 0,
    question2Score: 0,
  });

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: parseInt(value) });
  };

  const calculateMarks = () => {
    const totalMarks = answers.question1Score + answers.question2Score;
    setMarks(totalMarks);
  };

  const suggestCourses = (marks) => {
    const scoreRanges = [
      { min: 0, max: 1, course: "LEVEL-0" },
      { min: 2, max: 3, course: "LEVEL-1" },
      { min: 4, max: 5, course: "LEVEL-2" },
      { min: 6, max: 7, course: "IELTS Course" },
    ];

    for (const range of scoreRanges) {
      if (marks >= range.min && marks <= range.max) {
        return `${range.course} (${marks} out of ${range.max})`;
      }
    }

    return "No specific course recommendation. Please contact our support.";
  };

  const handleOpen = () => {
    setOpen(!open);
    // Reset marks when the modal is opened.
    setAnswers({
      question1Score: 0,
      question2Score: 0,
    });
    console.log("Navigate:", suggestCourses(marks).split("(")[0])
    if (marks) {

      navigate(`/courseDetails/${suggestCourses(marks).split("(")[0]}`)
      setMarks(0);
    }

  };

  return (
    <div>
      <Button onClick={handleOpen} variant="gradient">
        Assist you
      </Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>
          Give this test to suggest which course is preferable for you!
        </DialogHeader>
        <DialogBody>
          <div>
            <h2 className="pb-2 font-bold text-center">
              Course Preference Questionnaire
            </h2>
            <div>
              <div className="py-2">
                <label htmlFor="question1Score">
                  Question 1: What's your english spoken skill?
                </label>
              </div>
              <div className="flex gap-5 py-2">
                <label>
                  <input
                    type="radio"
                    name="question1Score"
                    value="1"
                    checked={answers.question1Score === 1}
                    onChange={handleRadioChange}
                  />{" "}
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    name="question1Score"
                    value="2"
                    checked={answers.question1Score === 2}
                    onChange={handleRadioChange}
                  />{" "}
                  Better
                </label>
                <label>
                  <input
                    type="radio"
                    name="question1Score"
                    value="3"
                    checked={answers.question1Score === 3}
                    onChange={handleRadioChange}
                  />{" "}
                  Best
                </label>
                <label>
                  <input
                    type="radio"
                    name="question1Score"
                    value="0"
                    checked={answers.question1Score === 0}
                    onChange={handleRadioChange}
                  />{" "}
                  weak
                </label>
              </div>
            </div>
            <div className="py-1">
              <div className="py-2">
                <label htmlFor="question2Score">
                  Question 2: What are your career goals?
                </label>
              </div>
              <div className="flex gap-5 py-1">
                <label>
                  <input
                    type="radio"
                    name="question2Score"
                    value="1"
                    checked={answers.question2Score === 1}
                    onChange={handleRadioChange}
                  />{" "}
                  Ambitious
                </label>
                <label>
                  <input
                    type="radio"
                    name="question2Score"
                    value="3"
                    checked={answers.question2Score === 3}
                    onChange={handleRadioChange}
                  />{" "}
                  Best Effort
                </label>
                <label>
                  <input
                    type="radio"
                    name="question2Score"
                    value="2"
                    checked={answers.question2Score === 2}
                    onChange={handleRadioChange}
                  />{" "}
                  Achievement
                </label>
              </div>
            </div>
            <div className="py-4">
              <Button onClick={calculateMarks} className="bg-blue-600 py-2">
                Submit
              </Button>
            </div>
            {marks !== null && (
              <div>
                {/* <p>Your total marks: {marks}</p> */}
                <p>
                  Recommended Course:{" "}
                  <span className="font-bold">{suggestCourses(marks)}</span>
                </p>
              </div>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>

          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Admission</span>
          </Button>

        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Modal;
