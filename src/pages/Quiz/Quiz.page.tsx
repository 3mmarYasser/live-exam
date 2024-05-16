import React from 'react';
import Quiz from "./components/Quiz.tsx";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute.component.tsx";
import {useGetExamQuery} from "../../graphql/generated/graphql.tsx";
import useDidMountEffect from "../../hooks/useDidMountEffect/useDidMountEffect.hook.tsx";
 const quiz =  {
    "quizTitle": "React Quiz Component Demo",
    "quizSynopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
    "nrOfQuestions": "4",
    "questions": [
        {
            "question": "How can you access the state of a component from inside of a member function?",
            "questionType": "text",
            "questionPic": "https://dummyimage.com/600x400/000/fff&text=X", // if you need to display Picture in Question
            "answerSelectionType": "single",
            "answers": [
                "this.getState()",
                "this.prototype.stateValue",
                "this.state",
                "this.values"
            ],
            "correctAnswer": "this.getState()",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
        },
        {
            "question": "ReactJS is developed by _____?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "Google Engineers",
                "Facebook Engineers"
            ],
            "correctAnswer": "Google Engineers",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "20"
        },
        {
            "question": "ReactJS is an MVC based framework?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "True",
                "False"
            ],
            "correctAnswer": "True",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "10"
        },
        {
            "question": "Which of the following concepts is/are key to ReactJS?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "Component-oriented design",
                "Event delegation model",
                "Both of the above",
            ],
            "correctAnswer": "Event delegation model",
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": "30"
        },
    ]
}


 console.log(quiz);
const QuizPage = () => {
    const {data,loading,error}= useGetExamQuery();
    useDidMountEffect(()=>{
        if(data.get_exams[0]){
            quiz.quizTitle = data.get_exams[0].title;
            quiz.nrOfQuestions = `${data.get_exams[0].questions.length}`;
            quiz.questions = data.get_exams[0].questions.map((question)=>{
                return {
                    question:question.question,
                    questionType:"text",
                    answerSelectionType:"single",
                    answers:question.answers.map((answer)=>answer),
                    correctAnswer:question.correct_answer,
                    messageForCorrectAnswer:"Correct answer. Good job.",
                    messageForIncorrectAnswer:"Incorrect answer. Please try again.",
                    explanation:"No",
                    point:`${question.grade}`
                }
            });
            quiz.questions.forEach(question => {
                const correctAnswerIndex = question.answers.findIndex(answer => answer === question.correctAnswer);
                question.correctAnswer = `${correctAnswerIndex+1}`;
            });
        }
        console.log(quiz)
    },[data,loading,error])
    return (
        <ProtectedRoute>
            <Quiz quiz={quiz} timer={1200} onComplete={(values)=>{
                console.log(values)
                window.localStorage.setItem("quizResult", JSON.stringify(values))
            }} />
        </ProtectedRoute>
    );
};

export default QuizPage;
