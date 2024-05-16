import React, { useState, useEffect, useCallback } from 'react';
import Core from './Core.quiz';
import defaultLocale from './Locale';
import {MdInfo, MdTimer} from "react-icons/md";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import {IoCheckmarkDoneCircleSharp} from "react-icons/io5";
const quizResultLocale = JSON.parse(localStorage.getItem('quizResult'));

interface Props {
    quiz: any;
    shuffle?: boolean;
    shuffleAnswer?: boolean;
    showDefaultResult?: boolean;
    onComplete?: (obj: any) => void;
    customResultPage?: React.FC;
    showInstantFeedback?: boolean;
    continueTillCorrect?: boolean;
    revealAnswerOnSubmit?: boolean;
    allowNavigation?: boolean;
    onQuestionSubmit?: (obj: any) => void;
    disableSynopsis?: boolean;
    timer: number;
    allowPauseTimer?: boolean;
    userName?: string;

}
const  QuizComponent:React.FC<Props> = ({
                  quiz,
                  shuffle,
                  shuffleAnswer=true,
                  showDefaultResult,
                  onComplete,
                  customResultPage,
                  showInstantFeedback,
                  continueTillCorrect,
                  revealAnswerOnSubmit,
                  allowNavigation,
                  onQuestionSubmit,
                  disableSynopsis,
                  timer,
                  allowPauseTimer,
                                            userName="Ammar"
              })=> {

    const [start, setStart] = useState(false);
    const [questions, setQuestions] = useState(quiz.questions);
    const nrOfQuestions = quiz.nrOfQuestions && quiz.nrOfQuestions < quiz.questions.length
        ? quiz.nrOfQuestions
        : quiz.questions.length;

    // Shuffle answers funtion here
    const shuffleAnswerSequence = (oldQuestions = []) => {
        const newQuestions = oldQuestions.map((question) => {
            const answerWithIndex = question.answers?.map((ans, i) => [ans, i]);
            const shuffledAnswersWithIndex = answerWithIndex.sort(
                () => Math.random() - 0.5,
            );
            const shuffledAnswers = shuffledAnswersWithIndex.map((ans) => ans[0]);
            if (question.answerSelectionType === 'single') {
                const oldCorrectAnswer = question.correctAnswer;
                const newCorrectAnswer = shuffledAnswersWithIndex.findIndex(
                    (ans) => `${ans[1] + 1}` === `${oldCorrectAnswer}`,
                ) + 1;
                return {
                    ...question,
                    correctAnswer: `${newCorrectAnswer}`,
                    answers: shuffledAnswers,
                };
            }
            if (question.answerSelectionType === 'multiple') {
                const oldCorrectAnswer = question.correctAnswer;
                const newCorrectAnswer = oldCorrectAnswer.map(
                    (cans) => shuffledAnswersWithIndex.findIndex(
                        (ans) => `${ans[1] + 1}` === `${cans}`,
                    ) + 1,
                );
                return {
                    ...question,
                    correctAnswer: newCorrectAnswer,
                    answers: shuffledAnswers,
                };
            }
            return question;
        });
        return newQuestions;
    };
    const shuffleQuestions = useCallback((q) => {
        for (let i = q.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1));
            [q[i], q[j]] = [q[j], q[i]];
        }
        return q;
    }, []);

    useEffect(() => {
        if (disableSynopsis) setStart(true);
    }, []);

    useEffect(() => {
        let newQuestions = quiz.questions;

        if (shuffle) {
            newQuestions = shuffleQuestions(newQuestions);
        }

        if (shuffleAnswer) {
            newQuestions = shuffleAnswerSequence(newQuestions);
        }

        newQuestions.length = nrOfQuestions;
        newQuestions = newQuestions.map((question, index) => ({
            ...question,
            questionIndex: index + 1,
        }));
        setQuestions(newQuestions);
    }, [start]);

    const validateQuiz = (q) => {
        if (!q) {
            console.error('Quiz object is required.');
            return false;
        }

        if ((timer && typeof timer !== 'number') || (timer < 1)) {
            console.error(timer && typeof timer !== 'number' ? 'timer must be a number' : 'timer must be a number greater than 0');
            return false;
        }

        if (allowPauseTimer && typeof allowPauseTimer !== 'boolean') {
            console.error('allowPauseTimer must be a Boolean');
            return false;
        }

        for (let i = 0; i < questions.length; i += 1) {
            const {
                question,
                questionType,
                answerSelectionType,
                answers,
                correctAnswer,
            } = questions[i];
            if (!question) {
                console.error("Field 'question' is required.");
                return false;
            }

            if (!questionType) {
                console.error("Field 'questionType' is required.");
                return false;
            }
            if (questionType !== 'text' && questionType !== 'photo') {
                console.error(
                    "The value of 'questionType' is either 'text' or 'photo'.",
                );
                return false;
            }

            if (!answers) {
                console.error("Field 'answers' is required.");
                return false;
            }
            if (!Array.isArray(answers)) {
                console.error("Field 'answers' has to be an Array");
                return false;
            }

            if (!correctAnswer) {
                console.error("Field 'correctAnswer' is required.");
                return false;
            }

            let selectType = answerSelectionType;

            if (!answerSelectionType) {
                // Default single to avoid code breaking due to automatic version upgrade
                console.warn(
                    'Field answerSelectionType should be defined since v0.3.0. Use single by default.',
                );
                selectType = answerSelectionType || 'single';
            }

            if (
                selectType === 'single'
                && !(typeof selectType === 'string' || selectType instanceof String)
            ) {
                console.error(
                    'answerSelectionType is single but expecting String in the field correctAnswer',
                );
                return false;
            }

            if (selectType === 'multiple' && !Array.isArray(correctAnswer)) {
                console.error(
                    'answerSelectionType is multiple but expecting Array in the field correctAnswer',
                );
                return false;
            }
        }

        return true;
    };

    if (!validateQuiz(quiz)) {
        return null;
    }

    const appLocale = {
        ...defaultLocale,
        ...quiz.appLocale,
    };
    const {user} = useSelector((state:RootState)=>state.auth)
    return (
        <div className="min-h-screen  flex  ">
            {!start && (
                <div className="flex w-full  px-8 justify-between items-center ">
                    <div className="flex w-full lg:w-1/2 flex-col gap-8">
                        <h1 className="text-5xl font-medium text-base-content/50 ">Hi, <span className="text-primary">{user.name}</span></h1>
                        <div>
                            <h4 className="text-3xl text-base-content/50 mb-3">Topic</h4>
                            <h2 className="text-3xl">{quiz.quizTitle}</h2>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <MdInfo className="text-2xl text-primary"/>
                                <span className="text-xl font-[400]">
                                    {appLocale.landingHeaderText.replace(
                                    '<questionLength>',
                                    ('0' + nrOfQuestions).slice(-2),
                                )}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdTimer className="text-2xl text-primary"/>
                                <span className="text-xl font-[400]">
                                {('0' + timer / 60).slice(-2)}
                                    Min.
                                </span>
                            </div>
                        </div>
                        <p className="text-lg text-base-content/70">
                            {quiz.quizSynopsis && (
                                <div className="">{quiz.quizSynopsis}</div>
                            )}
                        </p>
                        {!!quizResultLocale&&(
                            <div className="text-lg text-base-content/70 flex gap-2 items-center">
                                Your Grade is
                                <p>{quizResultLocale.correctPoints} / {quizResultLocale.totalPoints}</p>
                                <IoCheckmarkDoneCircleSharp className="text-xl text-success" />

                            </div>

                        )}
                        <div className="">
                            <button type="button" disabled={!!quizResultLocale} onClick={() => setStart(true)} className="btn btn-wide btn-primary">
                                {!quizResultLocale ? appLocale.startQuizBtn :"You have Already Taken this Quiz"}
                            </button>
                        </div>
                    </div>

                    <div className="hidden w-1/2 lg:flex flex-col gap-2 items-center justify-center">

                        <Link className="w-40  block  ms-28" to={"/"}>
                            <img src="https://muc.edu.eg/assets/img/logo.png"
                                 alt="Logo" className="w-full"/></Link>
                        <h1 className="text-5xl font-medium text-base-content/50">
                            Online Tests
                        </h1>

                        <div className=" hidden w-full  lg:block"><img
                            src="https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2020/02/form-builders-11.webp"
                            alt="Cover Image"
                            className="w-full"/></div>
                    </div>
                </div>
            )}

            {start && (
                <Core
                    quiz={quiz}
                    questions={questions}
                    showDefaultResult={showDefaultResult}
                    onComplete={onComplete}
                    customResultPage={customResultPage}
                    showInstantFeedback={showInstantFeedback}
                    continueTillCorrect={continueTillCorrect}
                    revealAnswerOnSubmit={revealAnswerOnSubmit}
                    allowNavigation={allowNavigation}
                    appLocale={appLocale}
                    onQuestionSubmit={onQuestionSubmit}
                    timer={timer}
                    allowPauseTimer={allowPauseTimer}
                />
            )}
        </div>
    );
}

export default QuizComponent;