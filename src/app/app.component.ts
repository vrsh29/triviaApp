import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import * as CanvasJS from "canvasjs/dist/canvasjs.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  questions;

  answers = {};
  correctCount = 0;
  InCorrect = 0;
  chart_valid = false;

  ngOnInit() {
    this.questions = [
      {
        "questionText": "In which movie would you hear the song 'Hakuna Matata'?", "answers": [
          { "answerText": "Beauty and the Beast", "correct": false },
          { "answerText": "Lion King", "correct": true },
          { "answerText": "Cinderella", "correct": false },
          { "answerText": "Finding Nemo", "correct": false }
        ]
      },
      {
        "questionText": "Mount Everest is located in ?", "answers": [
          { "answerText": "India", "correct": false },
          { "answerText": "Nepal", "correct": true },
          { "answerText": "Tibet", "correct": false },
          { "answerText": "China", "correct": false }
        ]
      },
      {
        "questionText": "What language defines the behavior of a web page?", "answers": [
          { "answerText": "HTML", "correct": false },
          { "answerText": "Javascript", "correct": true },
          { "answerText": "CSS", "correct": false },
          { "answerText": "XML", "correct": false }
        ]
      },
      {
        "questionText": "“Oscar awards” given for excellent work in the field of ?", "answers": [
          { "answerText": "Sports", "correct": false },
          { "answerText": "Literature", "correct": false },
          { "answerText": "Films", "correct": true },
          { "answerText": "Social activities", "correct": false },
        ]
      }
    ];

    this.showChart();

  }


  //Show result function
  showResult(valid) {
    this.correctCount = 0;
    this.InCorrect = 0;
    var qLength = this.questions.length;

    for (var i = 0; i < qLength; i++) {
      var answers = this.questions[i].answers;
      this.questions[i].userAnswerCorrect = false;
      this.questions[i].userAnswer = this.answers[i];
      if (this.answers[i]) {
        this.questions[i].invalid = false;
        for (var j = 0; j < answers.length; j++) {
          answers[j].selected = "done";
          if (this.questions[i].userAnswer === answers[j].answerText && answers[j].correct === true) {
            this.questions[i].userAnswerCorrect = true;
            answers[j].selected = "true";
            this.correctCount++;

          } else if (this.questions[i].userAnswer === answers[j].answerText && answers[j].correct === false) {
            answers[j].selected = "false";
            this.InCorrect++;

          }

        }
        this.chart_valid = true;
      } else {
        this.questions[i].invalid = true;
        this.chart_valid = false;
      }

    }
    if (this.chart_valid)
      this.showChart();

  };

  showChart() {
    var chart = new CanvasJS.Chart("chartContainer", {

      title: {
        text: "Trivia App"
      },
      data: [
        {
          type: "column",
          dataPoints: [
            { label: "Correct", y: this.correctCount },
            { label: "InCorrect", y: this.InCorrect },

          ]
        }
      ]
    });
    chart.render();

  }


  //Reset Function
  reset() {
    this.correctCount = 0;
    this.InCorrect = 0;
    location.reload();
    this.showChart();
  }


}
