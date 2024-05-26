import React from 'react';
import QuizComponent from "./components/Quiz.tsx";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute.component.tsx";
import {
    ExamSessionStatus, useEndExamMutation,
    useGetExamByIdQuery, useGetExamPioneersQuery,
    useGetSessionQuery,
    useStartExamMutation, useSubmitAnswerMutation
} from "../../graphql/generated/graphql.tsx";
import useDidMountEffect from "../../hooks/useDidMountEffect/useDidMountEffect.hook.tsx";
import {Quiz} from "./Quiz.interface.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useToasts} from "react-toast-notifications";
import {configureStore} from "@reduxjs/toolkit";

const quiz:Quiz =  {
    "quizTitle": "React Quiz",
    "quizSynopsis": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim",
    "nrOfQuestions": 4,
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
            "correctAnswer": 1,
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": 20
        },
        {
            "question": "ReactJS is developed by _____?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "Google Engineers",
                "Facebook Engineers"
            ],
            "correctAnswer": 1,
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": 20
        },
        {
            "question": "ReactJS is an MVC based framework?",
            "questionType": "text",
            "answerSelectionType": "single",
            "answers": [
                "True",
                "False"
            ],
            "correctAnswer": 1,
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": 10
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
            "correctAnswer": 2,
            "messageForCorrectAnswer": "Correct answer. Good job.",
            "messageForIncorrectAnswer": "Incorrect answer. Please try again.",
            "explanation": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            "point": 30
        },
    ]
}


const QuizPage = () => {
     const navigate = useNavigate();
     const toast = useToasts();
     const {id} = useParams();
     const {data,loading,error}= useGetExamByIdQuery({variables:{id:Number(id)}})
     const {data:SData ,loading:SLoading} = useGetExamPioneersQuery({variables:{exam_id:Number(id)}})
    const [StartExam ,{data:startData}] = useStartExamMutation();
     const [EndExam] = useEndExamMutation();
     const [SupAns] = useSubmitAnswerMutation()
    useDidMountEffect(()=>{
        if (error){
            toast.addToast(error.message,{appearance:"error"})
            navigate("/404")

        }
    },[error])
    useDidMountEffect(()=>{
        if(data?.get_exam){
            quiz.quizTitle = data.get_exam.title;
            quiz.nrOfQuestions = data.get_exam.questions.length;
            quiz.questions = data.get_exam.questions.map((question)=>{
                return {
                    question:question.question,
                    questionType:"text",
                    answerSelectionType:"single",
                    answers:question.answers.map((answer)=>answer),
                    correctAnswer:question.answers.findIndex(answer => answer === question.correct_answer)+1,
                    messageForCorrectAnswer:"Correct answer. Good job.",
                    messageForIncorrectAnswer:"Incorrect answer. Please try again.",
                    explanation:"No",
                    point:question.grade
                }
            });
        }
        console.log(quiz)
    },[data,loading,error])
    return (
        <ProtectedRoute>
            {!loading &&!SLoading && data &&
                <QuizComponent
                    startExam={async (start)=>{
                      await  StartExam({variables:{exam_id:Number(id)}})
                    }}
                    endExam={async (end)=>{
                       await EndExam({variables:{exam_id:Number(startData.start_exam_session.id)}})
                    }}
                revealAnswerOnSubmit={false}
                quiz={quiz} timer={data.get_exam.duration}
                onQuestionSubmit={async ({questionIndex ,Answer})=>{
                    console.log(data.get_exam.questions[questionIndex].id,Answer)
                 await   SupAns({variables:{question_id:data.get_exam.questions[questionIndex].id,answer:Answer ,exam_session_id:Number(startData.start_exam_session.id)}})
                }}

                isTaken={!!SData?.my_exam_pioneers[0]|| false}
                onComplete={(values)=>{
                console.log(values)
            }} />}
        </ProtectedRoute>
    );
};

export default QuizPage;
