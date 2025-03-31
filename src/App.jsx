import './App.css'
import { useState, useEffect } from "react";
import Description from "./components/Description/Description"
import Feedback from "./components/Feedback/Feedback";
import Options from "./components/Options/Options";
import Notification from "./components/Notification/Notification";

const App = () => {

  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("saved-feedback");
    return savedFeedback
      ? JSON.parse(savedFeedback)
      : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem("saved-feedback", JSON.stringify(feedback));
  }, [feedback]);

const [feedbackGiven, setFeedbackGiven] = useState(() => {
  const savedFeedbackGiven = localStorage.getItem("saved-feedback-given");
  return savedFeedbackGiven === "true";
});

useEffect(() => {
  localStorage.setItem("saved-feedback-given", feedbackGiven);
}, [feedbackGiven]);

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = Math.round((feedback.good / totalFeedback) * 100);

  const updateFeedback = (feedbackType) => {
    setFeedback({
      ...feedback,
      [feedbackType]: feedback[feedbackType] + 1,
    });
    setFeedbackGiven(true);
  };

  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
    setFeedbackGiven(false);
  };

  return (
    <>
      <Description />
      <Options
        resetFeedback={resetFeedback}
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
      />

      {feedbackGiven && (
        <div>
          <Feedback
            positiveFeedback={positiveFeedback}
            feedback={feedback}
            totalFeedback={totalFeedback}
          />
        </div>
      )}
      {!feedbackGiven && <Notification />}
    </>
  );
}

export default App