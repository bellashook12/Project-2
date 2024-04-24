import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";


export class TaggingQuestion extends DDD {

  static get tag() {
    return 'tagging-question';
  }
  
  constructor() {
    super();
    this.question = "default";
    this.image = "";    

    //this.options = ["Good Form", "Poor Taste", "Contrasting Themes", "AI", "Shading", "Original Work", "Accessible"];
    this.correctAnswers = [""];
    this.draggedIndex;
    this.draggedFrom;
    this.hintText = "Drag Correct Answers Here";

    this.checked = false;
    this.answerSet = "default";
    this.options = []; 
    

  }

  
  static get styles() {
    return css`
      :host {
        display: flex;
        padding: var(--ddd-spacing-4);
        align-items: center;
        justify-content: center;
        
      }

      .background{
        background-color: var(--ddd-theme-default-limestoneMaxLight);
        padding: var(--ddd-spacing-3);
        display:flex;
        height: 1500px;
        width: 1000px;
        flex-direction: column;
        justify-content: center;
        
      }

      .image{
        display: flex;
        height: 400px;
        width: 500px;
        border: solid;
        align-self: center;
        
        
        
      }

      .question {
        color: black;
        font-size: 30px;
        padding: var(--ddd-spacing-4);
        padding-top:var(--ddd-spacing-6);
        flex-direction: column;
      }


      .answers-start-box{
        padding: var(--ddd-spacing-3);
      }

      .answer-options-box {
        font-size: 28px;
        display: inline-flex;
        margin: var(--ddd-spacing-3);
        padding: var(--ddd-spacing-4);
        cursor: pointer;
        border: solid 3px var(--ddd-theme-default-keystoneYellow);
        background-color: var(--ddd-theme-default-roarLight);
        flex-direction: row;
        

        
      }


      .choices{
        border: solid 1px;
        display: flex;
        padding: 8px;
        margin: 8px;
        justify-content: center;
        align-items: center;
        
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
        flex-direction: column;
        
      }


      .buttons {
        display: flex;
        padding: var(--ddd-spacing-6);
        margin: var(--ddd-spacing-3);
        align-self: center;
        align-self: center;
        align-items: center;
        justify-content: center;
      
        
      }

      .buttons button{
        width: 50px;
        font-size: 30px;
        display: inline-flex;
        padding: 8px;
        margin: 16px;
        align-self: center;
        align-items: center;
        justify-content: center;
        width: 200px;
        
        
      }

      .nonsense{
        padding: var(--ddd-spacing-3);
        font-size: 24px;
        flex-direction: column;
        padding-bottom: 30px;
      }

      .feedbackArea{
        //background-color: lightgray;
        height: 10px;
        flex-direction: column;
        height: 30px;
        font-size: 18px;
      }

      
  `;
  }


 fromJson() {  

  fetch('src/answers.json')
  .then((response) => response.json())
        .then((json) => {
          const possibleQuestions = json[this.answerSet];
          

        this.options = [];
        const tags = [];
        for (const key in possibleQuestions) {
          const option = possibleQuestions[key];
          const choice = document.createElement('choices');
          choice.classList.add('chip');
          choice.textContent = key;
          choice.dataset.correct = option.correct;
          choice.dataset.feedback = option.feedback;
          tags.push(choice);
        }

        tags.forEach(choice => {
          this.options.push(choice);
        });

        this.shuffle();
    });
  }

          



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
    this.fromJson();
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

  drop(e, target, index, from) {
    e.preventDefault();

    if (this.draggedIndex == null && this.draggedFrom == null) {
      this.draggedIndex = index;
      this.draggedFrom = from;
    }

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
    this.draggedIndex = null;
    this.draggedFrom = null;
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

  reset() {
    const feedbackArea = this.shadowRoot.querySelector('.feedbackArea');
    feedbackArea.innerHTML = '';

    if (this.correctAnswers.length > 0) {
        this.correctAnswers.forEach(answer => {
            this.options.push(answer);
        });
        this.correctAnswers = [];
    }

    this.checked = false; 
    this.shadowRoot.querySelector('.checkBtn').classList.remove('disabled'); // Enable check button

    this.shuffle();
    this.requestUpdate();
}

  shuffle() {
    for (let i = this.options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.options[i], this.options[j]] = [this.options[j], this.options[i]];
    }
  }


 




  checkTags() {
    if(this.checked == false){
      
      this.checked = true;

      
      let allDroppedCorrect = true;
      let allBankedCorrect = true;
  
      this.shadowRoot.querySelector('.checkBtn').classList.add('disabled');
  
      // Reset feedback section
      this.shadowRoot.querySelector('.feedbackArea').style.display = 'flex';
      this.shadowRoot.querySelector('.feedbackArea').innerHTML = ``;

      // Dropped tags:
      const droppedTags = this.shadowRoot.querySelectorAll('.correctAnswers .chip');
      for (const tag of droppedTags) {
          const isCorrect = tag.dataset.correct === 'true';
          if(isCorrect){
            tag.classList.add("correct");
            

            // FEEDBACK SEC CORRECT
            this.shadowRoot.querySelector('.feedbackArea').innerHTML += `<li class="green">${tag.dataset.feedback}</li>`;
          }
          else {
            tag.classList.add("incorrect");
            allDroppedCorrect = false;
            tag.title = tag.dataset.feedback;
            

            // FEEDBACK SEC INCORRECT
            this.shadowRoot.querySelector('.feedbackArea').innerHTML += `<li class="red">${tag.dataset.feedback}</li>`;
          }
          tag.classList.add("noPointerEvents");
          tag.setAttribute('tabindex', -1);
      }
  
      // Banked tags:
      const bankedTags = this.shadowRoot.querySelectorAll('.choices .chip');
      for (const tag of bankedTags) {
          const isCorrect = tag.dataset.correct === 'true';
          if(isCorrect){
            allBankedCorrect = false;
            tag.title = tag.dataset.feedback;

            // FEEDBACK SEC
            //this.shadowRoot.querySelector('#feedbackSection').innerHTML += `<li class="green">${tag.dataset.feedback}</li>`;
          }
          tag.classList.add("noPointerEvents");
          tag.setAttribute('tabindex', -1);
      }
  
      if(allDroppedCorrect && allBankedCorrect) {  // All answers (banked and dropped) are where they should be
        //console.log("100%!!");
        this.makeItRain();
        //this.shadowRoot.querySelector('#feedbackSection').style.display = 'none';

        this.shadowRoot.querySelector('.feedbackArea').innerHTML = ``;
        const bankedTags = this.shadowRoot.querySelectorAll('.correctAnswers .chip');
        for (const tag of bankedTags) {
            allBankedCorrect = false;
            tag.title = tag.dataset.feedback;

            // FEEDBACK SEC
            this.shadowRoot.querySelector('.feedbackArea').innerHTML += `<li class="green">${tag.dataset.feedback}</li>`;
          }

      }
     
    }
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
                ${this.correctAnswers.map((options, index) => html`
                  <div class="answers-wrapper">
                    <div class="correctAnswers" draggable="true" data-index="${index}" data-origin="answer-drop-box">${options}</div>
                  </div>
                `)}
              </div>

              <div class ="feedbackArea">
              
              </div>

              <div class="buttons">
                <button @click="${this.reset}" class="resetButton">Reset</button>
                <button @click="${this.checkTags}" class="checkBtn">Check</button>
              </div>
            </div>

          <div class="answer-options-box">
            ${this.options.map((options, index) => html`
              <div class="choices-wrapper">
                <div class="choices" draggable="true" data-index="${index}" data-origin="answer-options-box">${options}</div>
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
      answerSet: { type: String, reflect: true},
      question: { type: String, reflect: true},
      image: { type: String, reflect: true},
      
      
    };
  }
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);


// checkAnswers() {

//   this.question = ''; 
//   // this.checkedColor = true;

//   this.correctAnswers.forEach((ans, index) => {
//     const feedback = this.correctAnswers[index].dataset.feedback;
//     let colorClass; // Declare colorClass variable outside the if-else block

//     if (this.answers[index].dataset.correct == true) {
//       colorClass = 'correct'; // Set class to correct if feedback is correct
//     } else {
//       colorClass = 'incorrect'; // Set class to incorrect if feedback is incorrect
//     }

//     // Append feedback with the appropriate color class
//     this.teacherText += `<span class="${colorClass}">${feedback}</span>` + '\n';
//   });

//   this.requestUpdate();

// // Display feedback in the feedbackArea
// const feedbackArea = this.shadowRoot.querySelector('.feedbackArea');
// feedbackArea.innerHTML = ''; // Clear previous feedback
// result.forEach(({ feedback }) => {
//   const feedbackDiv = document.createElement('div');
//   feedbackDiv.textContent = feedback;
//   feedbackArea.appendChild(feedbackDiv);
// });
// }


// check() {  

//   fetch('src/answers.json')
//   .then((response) => response.json())
//         .then((json) => {
//           const possibleQuestions = json[this.answerSet];
          

//         this.options = [];
//         const tags = [];
//         for (const key in possibleQuestions) {
//           const option = possibleQuestions[key];
//           const choice = document.createElement('choices');
//           choice.textContent = key;
//           choice.dataset.correct = option.correct;
//           choice.dataset.feedback = option.feedback;
//           tags.push(choice);
//         }

//         tags.forEach(choice => {
//           this.options.push(choice);
//         });

//         //this.shuffle();
//     });
//   }