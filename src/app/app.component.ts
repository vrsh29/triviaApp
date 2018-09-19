import { Component, OnInit } from '@angular/core';
import { Http,Response } from '@angular/http';
import * as CanvasJS from "canvasjs/dist/canvasjs.js";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  questions;

  answers ={};
  correctCount = 0;
  InCorrect=0;
  chart_valid = false;

  ngOnInit() {
    this.questions = [
      {"questionText": "Which of the following part of the Sun is visible by human?", "answers": [
        {"answerText":"Photosphere", "correct": true},
        {"answerText":"Corona", "correct": false},
        {"answerText":"Chromospheres", "correct": false}
        ]},
      {"questionText": "Which of the following part of the Sun is visible at the time of eclipse?", "answers": [
        {"answerText":"Photosphere", "correct": false},
        {"answerText":"Corona", "correct": true},
        {"answerText":"Chromospheres", "correct": false}
        ]},
      {"questionText": "Which is the deepest point from the sea level on the Earth?", "answers": [
        {"answerText":"Red Sea", "correct": false},
        {"answerText":"Mariana Trench", "correct": true},
        {"answerText":"Pacific Ocean", "correct": false}
        ]},
      {"questionText": "What is the time taken by the light of the Sun to reach on the Earth?", "answers": [
        {"answerText":"9 Minute", "correct": false},
        {"answerText":"8 Minute", "correct": false},
        {"answerText":"8 Minute 18 Second", "correct": true}
        ]}
    ];

    this.showChart();
    
  }


  //Show result function
  showResult(valid){
    this.correctCount = 0;
    this.InCorrect=0;
    var qLength = this.questions.length;

    for(var i=0;i<qLength;i++){
      var answers = this.questions[i].answers;
      this.questions[i].userAnswerCorrect = false;
      this.questions[i].userAnswer = this.answers[i];
      if(this.answers[i]){
        this.questions[i].invalid = false;
        for(var j=0;j<answers.length;j++){
          answers[j].selected = "done";
          if (this.questions[i].userAnswer === answers[j].answerText && answers[j].correct===true){
            this.questions[i].userAnswerCorrect = true;
            answers[j].selected = "true";
            this.correctCount++;
           
          }else if(this.questions[i].userAnswer === answers[j].answerText && answers[j].correct===false){	
            answers[j].selected = "false";
            this.InCorrect++;
       
          }
          
        }
        this.chart_valid = true;
      }else{
        this.questions[i].invalid = true;
        this.chart_valid = false;
      }
      
    }
    if(this.chart_valid)
	  this.showChart();
	
  };

  showChart(){
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
  reset(){
  this.correctCount=0;
  this.InCorrect=0;
  location.reload();
  this.showChart();  
  }

  
}
