import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json";

interface QuizzQuestions {
  title: string;
  questions: any;
  results: {
    [key: string]: any;
  };
}

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  quizz_questions: QuizzQuestions = {
    title: '',
    questions: [],
    results: {}
  };

  title: string = "";

  questions: any;
  questionSelected: any;

  answers: string[] = [];
  answerSelected?: string;

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  correctAnswers: number = 0;

  constructor() { }

  ngOnInit(): void {
    if (quizz_questions) {
      this.finished = false;
      this.title = quizz_questions.title;

      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];

      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    if (value === "T") {
      this.correctAnswers++;
    }
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: any = this.correctAnswers.toString();
      this.finished = true;
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  restartQuizz(): void {
    window.location.reload();
  }

}