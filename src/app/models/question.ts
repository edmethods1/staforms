export enum QuestionType {
    Static = 1,
    Textual = 2,
    Checkbox = 3,
    Radiobutton = 5,
    Form = 7,
    Autocomplete = 8,
    Buttons = 9
}

export enum ResponseType {
    Static = 1
}

export interface Question {
    id: number;
    questionText: string;
    notes?: string;
    questionTextReplaced?: string;
    type: QuestionType;
    variable?: string;
    previousQuestionId?: number;
    actionOnSubmit?: {
        request?: {
            url: string,
            variable: string
        }
    };
}

export class AutocompleteQuestion implements Question {
    id: number;
    questionText: string;
    notes?: string;
    questionTextReplaced?: string;
    type: QuestionType;
    variable?: string;
    previousQuestionId?: number;
    answer?: string;
    nextQuestionId?: number;
    options: any[];
    optionsGetter?: {
        url?: string,
        variable?: string
    };
    nextQuestions?: number[];
}

export class RadiobuttonQuestion implements Question {
    id: number;
    questionText: string;
    notes?: string;
    questionTextReplaced?: string;
    type: QuestionType;
    variable?: string;
    previousQuestionId?: number;
    answer?: string;
    otherAnswer?: string;
    nextQuestionId?: number;
    nextQuestions?: number[];
    options: any[];
    optionsGetter?: {
        url?: string,
        variable?: string
    };
}

export class ButtonsQuestion implements Question {
    id: number;
    questionText: string;
    notes?: string;
    questionTextReplaced?: string;
    type: QuestionType;
    variable?: string;
    previousQuestionId?: number;
    answer?: string;
    otherAnswer?: string;
    nextQuestionId?: number;
    nextQuestions?: number[];
    options: any[];
    optionsGetter?: {
        url?: string,
        variable?: string
    };
}

export class CheckboxQuestion implements Question {
    id: number;
    questionText: string;
    notes?: string;
    questionTextReplaced?: string;
    type: QuestionType;
    variable?: string;
    previousQuestionId?: number;
    answer?: string;
    nextQuestionId?: number;
    nextQuestions?: number[];
    options: any[];
    answers?: any[];
    optionsGetter?: {
        url?: string,
        variable?: string
    };
}

export class FormQuestion implements Question {
    id: number;
    questionText: string;
    notes?: string;
    questionTextReplaced?: string;
    type: QuestionType;
    variable?: string;
    previousQuestionId?: number;
    nextQuestionId?: number;
    fields: any[];
    answers?: any[];
    options?: any;
    answer?: string;
}

export class TextualQuestion implements Question {
    id: number;
    questionText: string;
    notes?: string;
    questionTextReplaced?: string;
    type: QuestionType;
    variable?: string;
    previousQuestionId?: number;
    answer?: string;
    nextQuestionId?: number;
    validation?: string;
    isTextArea?: boolean;
}

export class StaticQuestion implements Question {
    id: number;
    questionText: string;
    notes?: string;
    questionTextReplaced?: string;
    type: QuestionType;
    variable?: string;
    previousQuestionId?: number;
    nextQuestionId?: number;
}

export interface Form {
    id: number;
    formVersion: string;
    formTitle: string;
    firstQuestionId: number;
    variables: {};
    questions: Question[];
    backgroundUrl: string;
    currentQuestionId?: number;
    currentQuestions?: number[];
    finalMessage?: string;
}
