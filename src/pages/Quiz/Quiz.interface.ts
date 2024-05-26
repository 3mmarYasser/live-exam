type QuestionType = "text" | "photo";
type AnswerSelectionType = "single" | "multiple";

interface Question {
    question: string;
    questionType: QuestionType;
    questionPic?: string;
    answerSelectionType: AnswerSelectionType;
    answers: string [];
    correctAnswer: number | number[];
    messageForCorrectAnswer: string;
    messageForIncorrectAnswer: string;
    explanation: string;
    point: number;
    segment?: string;
    questionIndex?: number;
}

interface Quiz {
    quizTitle: string;
    quizSynopsis: string;
    nrOfQuestions: number;
    questions: Question[];
}

interface Locale {
    landingHeaderText: string;
    question: string;
    startQuizBtn: string;
    resultFilterAll: string;
    resultFilterCorrect: string;
    resultFilterIncorrect: string;
    resultFilterUnanswered: string;
    nextQuestionBtn: string;
    prevQuestionBtn: string;
    resultPageHeaderText: string;
    resultPagePoint: string;
    pauseScreenDisplay: string;
    timerTimeRemaining: string;
    timerTimeTaken: string;
    pauseScreenPause: string;
    pauseScreenResume: string;
    singleSelectionTagText: string;
    multipleSelectionTagText: string;
    pickNumberOfSelection: string;
    marksOfQuestion: string;
    explanation: string;
}



interface QuestionSummary {
    numberOfQuestions: number;
    numberOfCorrectAnswers: number;
    numberOfIncorrectAnswers: number;
    questions: Question[];
    userInput: (string | number[])[];
    totalPoints: number;
    correctPoints: number;
}
type onCompleteType = (questionSummary: QuestionSummary) => void;
type onQuestionSubmitType =  (obj: { questionIndex: number; Answer: string }) => void;

export type { Quiz, Question ,Locale ,QuestionSummary  ,QuestionType,AnswerSelectionType ,onCompleteType,onQuestionSubmitType};
