import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";


export class TaggingQuestion extends DDD {

  static get tag() {
    return 'tagging-question';
  }
  
  constructor() {
    super();
    this.question = "Which of the following big ideas would YOU associate with this artistic work?";
    this.image = "https://private-user-images.githubusercontent.com/329735/320881436-b1e940c9-b838-4e0f-acfb-2d354926bc8d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyODUzOTcsIm5iZiI6MTcxMzI4NTA5NywicGF0aCI6Ii8zMjk3MzUvMzIwODgxNDM2LWIxZTk0MGM5LWI4MzgtNGUwZi1hY2ZiLTJkMzU0OTI2YmM4ZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNjMxMzdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wZTc4YjA1NWZhYmE0MWNiNWVkOGFiNmZhZTU4Nzg3NDJmOTQxYmNhY2MwMDg3YWNhMDQyYzQ5N2NjN2E1NzI1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.YVplTmO04YCMAImA0GGmFG5bU2UBpI-I1Cy2LoR7bPs";    

    this.options = ["Good Form", "Poor Taste", "Contrasting Themes", "AI", "Shading", "Original Work", "Accessible"];
    this.correctAnswers = [""];
    this.draggedIndex;
    this.draggedFrom;
    this.hintText = "Drag Correct Answers Here";

    this.checked = false;
    this.answerSet = "default";
    
    
    

  }

  
  static get styles() {
    return css`
      :host {
        display: flex;
        padding: var(--ddd-spacing-4);
       // align-items: center;
       // justify-content: center;
        
      }

      .background{
        background-color: var(--ddd-theme-default-limestoneMaxLight);
        padding: var(--ddd-spacing-3);
        display:flex;
        height: 1400px;
        width: 900px;
        flex-direction: column;
      }

      .image{
        display: flex;
        height: 200px;
        width: 200px;
        padding: var(--ddd-spacing-3);
        
        
      }

      .question {
        color: black;
        font-size: 32px;
        padding: var(--ddd-spacing-3);
      }
/

      .answers-start-box{
        padding: var(--ddd-spacing-3);
      }

      .answer-options-box {
        font-size: 28px;
        display: inline;
        margin: var(--ddd-spacing-3);
        padding: var(--ddd-spacing-4);
        cursor: pointer;
        border: solid 3px var(--ddd-theme-default-keystoneYellow);
        background-color: var(--ddd-theme-default-roarLight);


        
      }

      .answer-drop-box{
        background-color: var(--ddd-theme-default-alertNonEmergency);
        border: dashed 3px var(--ddd-theme-default-forestGreen);
        font-size: 28px;
        display: inline;
        margin: var(--ddd-spacing-3);
        padding: var(--ddd-spacing-4);
        cursor: pointer;
        min-height: 32px;
       
        display: flex;
        
      }


      .buttons {
        //display: flex;
        padding: var(--ddd-spacing-3);
        margin: var(--ddd-spacing-3);
      
        
      }

      .buttons button{
        width: 50px;
        font-size: 30px;
        display: flex;
        padding: 8px;
        margin: 16px;
        
        
      }

      .nonsense{
        padding: var(--ddd-spacing-3);
        font-size: 24px;
      }
      



  `;
  }

 // check() {  

//   fetch('answers.json')
//   .then(response => response.json())
//         .then(data => {
//           console.log(data);
//             const correctAnswers = data.haxLogo;

//             const feedbacks = [];
//             this.correctAnswers.forEach(answer => {
//                 if (correctAnswers.hasOwnProperty(answer)) {
//                     if (correctAnswers[answer].correct) {
//                         feedbacks.push(correctAnswers[answer].feedback);
//                     }
//                 }
//             });

//             if (feedbacks.length === 0) {
//                 alert("None of the answers are correct!");
//             } else {
//                 feedbacks.forEach(feedback => {
//                     alert(feedback);
//                 });
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching JSON file: ', error);
//         });
// }


  firstUpdated() {
    super.firstUpdated();
    const answerBoxes = this.shadowRoot.querySelectorAll('.answer-drop-box');
    const questionBoxes = this.shadowRoot.querySelectorAll('.answer-options-box');

    answerBoxes.forEach(answerBox => {
      answerBox.addEventListener('dragstart', (e) => this.dragStart(e));
      answerBox.addEventListener('dragover', (e) => this.dragOver(e));
      answerBox.addEventListener('dragenter', (e) => this.dragEnter(e));
      answerBox.addEventListener('dragleave', (e) => this.dragLeave(e));
      answerBox.addEventListener('drop', (e) => this.drop(e, 'answer-drop-box'));
    });

    questionBoxes.forEach(questionBox => {
      questionBox.addEventListener('dragstart', (e) => this.dragStart(e));
      questionBox.addEventListener('dragover', (e) => this.dragOver(e));
      questionBox.addEventListener('dragenter', (e) => this.dragEnter(e));
      questionBox.addEventListener('dragleave', (e) => this.dragLeave(e));
      questionBox.addEventListener('drop', (e) => this.drop(e, 'answer-options-box'));
    });
  }

  dragOver(e) {
    e.preventDefault();
  }

  dragStart(e) {
    this.draggedIndex = parseInt(e.target.dataset.index);
    this.draggedFrom = e.target.dataset.origin;
  }

  dragEnter(e) {
    e.preventDefault();
    e.target.classList.add('hovered');
  }

  dragLeave(e) {
    e.target.classList.remove('hovered');
  }

  drop(e, target) {
    e.preventDefault();

    e.target.classList.remove('hovered');

    if (target === 'answer-drop-box') {
      if (this.draggedFrom != 'answer-drop-box') {
        this.correctAnswers.push(this.options[this.draggedIndex]);
        this.options.splice(this.draggedIndex, 1);
      }
    } else if (target === 'answer-options-box') {
      if (this.draggedFrom != 'answer-options-box') {
        this.options.push(this.correctAnswers[this.draggedIndex]);
        this.correctAnswers.splice(this.draggedIndex, 1);
      }
    }
    this.hintTextCheck();

    this.requestUpdate();
  }

  hintTextCheck() {
    if (this.correctAnswers == '') {
      this.hintText = "Drag Correct Answers Here";
    } else {
      this.hintText = "";
    }

    this.requestUpdate();
  }

  clear() {
    if (this.correctAnswers != '') {

      this.correctAnswers.forEach(answer => {
        this.options.push(answer);
      });

      this.correctAnswers = [];
      
    }
    this.requestUpdate();
  }

  check() {
    if (this.correctAnswers != '') {
      
    }
    this.requestUpdate();
  }




  
  render() {
    return html`
    <div class= "wrapper">
      <div class= "background">
        <div class= "nonsense">Eventually this will be text about whatever picture i choose- This should be a block element that in your demo sits between some text that rambles about the topic in question so it appears more real to the context (this will be used in classes) You're going to make a choice today that will have a direct impact on where you are five years from now. The truth is, you'll make choice like that every day of your life. The problem is that on most days, you won't know the choice you make will have such a huge impact on your life in the future. So if you want to end up in a certain place in the future, you need to be careful of the choices you make today.There was a time in his life when her rudeness would have set him over the edge. He would have raised his voice and demanded to speak to the manager. That was no longer the case. He barely reacted at all, letting the rudeness melt away without saying a word back to her. He had been around long enough to know where rudeness came from and how unhappy the person must be to act in that way. All he could do was feel pity and be happy that he didn't feel the way she did to lash out like that.</div>
        <div id= "image-slot" ></div>
        <img class = "image" src= ${this.image} >


          <div class="question">Question: ${this.question}</div>
          <div class="answer-space">
              <div class="answer-drop-box">
                ${this.hintText}
                ${this.correctAnswers.map((answer, index) => html`
                  <div class="answers-wrapper">
                    <div class="correctAnswers" draggable="true" data-index="${index}" data-origin="answer-drop-box">${answer}</div>
                  </div>
                `)}
              </div>

              <div class="buttons">
                <button @click="${this.clear}" class="clear-btn">Reset</button>
                <button @click="${this.check}" class="check-btn">Check</button>
              </div>
            </div>

          <div class="answer-options-box">
            ${this.options.map((question, index) => html`
              <div class="choices-wrapper">
                <div class="choices" draggable="true" data-index="${index}" data-origin="answer-options-box">${question}</div>
              </div>
            `)}
          </div>
        </div>
      </div>
              

    
    `;

  

  }

  static get properties() {
    return {
      options: { type: Array, reflect: true },
      correctAnswers: { type: Array, reflect: true },
      draggedIndex: { type: Number, reflect: true },
      draggedFrom: { type: String, reflect: true},
      hintText: { type: String, reflect: true},
      
    };
  }
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);

