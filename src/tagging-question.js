import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";


export class TaggingQuestion extends DDD {

  static get tag() {
    return 'tagging-question';
  }
  
  constructor() {
    super();
    this.question = "Which of the following big ideas would YOU associate with this artistic work?";
    //this.image = "";  

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
        padding: 24px;
       // align-items: center;
       // justify-content: center;
        
      }

      .background{
        background-color: var(--ddd-theme-default-limestoneMaxLight);
        padding: 8px;
        display:flex;
        height: 1000px;
        width: 900px;
        flex-direction: column;
      }

      .image{
        display: flex;
        height: 200px;
        width: 200px;
        padding: 16px;
        
        
      }

      .question {
        color: black;
        font-size: 24px;
        padding: 16px;
      }
/

      .answers-start-box{
        padding: 16px;
      }

      .answer-options-box,.answer-drop-box {
        font-size: 28px;
        display: inline;
        margin: var(--ddd-spacing-3);
        padding: var(--ddd-spacing-4);
        cursor: pointer;
        border: solid 3px black;
        
      }

      .answer-drop-box{
        padding: 12px;
        border: solid 3px black;
        display: flex;
        
      }


      .buttons {
        display: flex;
        padding: 8px;
        margin: 8px;
        padding-top: 32px;
        size: 24px;
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
        <div id= "image-slot" ></div>


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

