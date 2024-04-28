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

    this.correctAnswers = [""];
    this.draggedIndex;
    this.draggedFrom;
    this.hintText = "Drag Correct Answers Here";

    this.checked = false;
    this.answerSet = "default";
    this.options = []; 
    this.nonsense= "";
    

  }

  
  static get styles() {
    return css`
      :host {
        display: flex;
        padding: var(--ddd-spacing-4);
        align-items: center;
        justify-content: center;
        --correct: var(--ddd-theme-default-opportunityGreen);
        --incorrect: var(--ddd-theme-default-original87Pink);
        
      }

      .background{
        background-color: var(--ddd-theme-default-limestoneMaxLight);
        padding: var(--ddd-spacing-3);
        display:flex;
        height: 1500px;
        width: 1400px;
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
        display: flex;
        margin: var(--ddd-spacing-3);
        padding: var(--ddd-spacing-4);
        cursor: pointer;
        border: solid 3px var(--ddd-theme-default-wonderPurple);
        background-color: var(--ddd-theme-default-alertNonEmergency);
        flex-direction: row;
        height: 200px;
      //  justify-content: flex-start;
       // align-items: flex-start;

        
      }


      .choices{
        border: solid 1px;
        display: flex;
        padding: var(--ddd-spacing-2);
        margin: var(--ddd-spacing-2);
        justify-content: center;
        align-items: center;
        display: flex;
        
      }


      .answer-drop-box{
        background-color: var(--ddd-theme-default-alertNonEmergency);
        border: dashed 3px var(--ddd-theme-default-opportunityGreen);
        font-size: 28px;
        //display: inline;
        margin: var(--ddd-spacing-3);
        padding: var(--ddd-spacing-4);
        cursor: pointer;
        min-height: 32px;
       
        display: flex;
        flex-direction: row;
        
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
        display: flex;
        padding: var(--ddd-spacing-2);
        margin: var(--ddd-spacing-4);
        align-self: center;
        align-items: center;
        justify-content: center;
        width: 200px;
        background-color: var(--ddd-theme-default-linkLight);
      
        
      }

      .nonsense{
        padding: var(--ddd-spacing-3);
        font-size: 24px;
        flex-direction: column;
        padding-bottom: var(--ddd-spacing-7);
      }

      .feedbackArea{
        //background-color: lightgray;
        flex-direction: column;
        height: 120px;
        font-size: 18px;
        display: flex;
        max-height: 120px;
      }
     
      .green {
        color: var(--correct);
      }
      .red {
        color: var(--incorrect);
      }

      .correctAnswers{
        border: solid 1px;
        display: flex;
        padding: var(--ddd-spacing-2);
        margin: var(--ddd-spacing-2);
        justify-content: center;
        align-items: center;
        display: flex;

      }
      .correct {
        border: solid 2px var(--correct);
        color: var(--correct);
        background: var(--ddd-theme-default-successLight);
        padding: var(--ddd-spacing-2);
      }

      .incorrect {
        border: solid 2px var(--incorrect);
        color: var(--incorrect);
        background: var(--ddd-theme-default-alertImmediate);
        padding: var(--ddd-spacing-2);

  `;
  }

  makeItRain() {
    // this is called a dynamic import. It means it won't import the code for confetti until this method is called
    // the .then() syntax after is because dynamic imports return a Promise object. Meaning the then() code
    // will only run AFTER the code is imported and available to us
    import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        // This is a minor timing 'hack'. We know the code library above will import prior to this running
        // The "set timeout 0" means "wait 1 microtask and run it on the next cycle.
        // this "hack" ensures the element has had time to process in the DOM so that when we set popped
        // it's listening for changes so it can react
        setTimeout(() => {
          // forcibly set the poppped attribute on something with id confetti
          // while I've said in general NOT to do this, the confetti container element will reset this
          // after the animation runs so it's a simple way to generate the effect over and over again
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
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

    const answerChips = this.shadowRoot.querySelectorAll('.correctAnswers .chip');
    console.log(answerChips); 
    answerChips.forEach(chip => {
    console.log(chip); 
    chip.classList.remove('correct');
    chip.classList.remove('incorrect');
  });


    this.checked = false; 
    this.shadowRoot.querySelector('.checkBtn').classList.remove('disabled'); 


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
  
      this.shadowRoot.querySelector('.feedbackArea').style.display = 'flex';
      this.shadowRoot.querySelector('.feedbackArea').innerHTML = ``;

      const droppedTags = this.shadowRoot.querySelectorAll('.correctAnswers .chip');
      for (const tag of droppedTags) {
          const isCorrect = tag.dataset.correct === 'true';
          if(isCorrect){
            tag.classList.add("correct");
            

            this.shadowRoot.querySelector('.feedbackArea').innerHTML += `<li class="green">${tag.dataset.feedback}</li>`;
           
          }
          else {
            tag.classList.add("incorrect");
            allDroppedCorrect = false;
            tag.title = tag.dataset.feedback;
            

            this.shadowRoot.querySelector('.feedbackArea').innerHTML += `<li class="red">${tag.dataset.feedback}</li>`;
            
          }
          tag.classList.add("noPointerEvents");
          tag.setAttribute('tabindex', -1);
         // tag.style.border = 'none';
      }
  
      const bankedTags = this.shadowRoot.querySelectorAll('.choices .chip');
      for (const tag of bankedTags) {
          const isCorrect = tag.dataset.correct === 'true';
          if(isCorrect){
            allBankedCorrect = false;
            tag.title = tag.dataset.feedback;

            
            this.shadowRoot.querySelector('#feedbackSection').innerHTML += `<li class="green">${tag.dataset.feedback}</li>`;
          }
          tag.classList.add("noPointerEvents");
          tag.setAttribute('tabindex', -1);
      }
  
      if(allDroppedCorrect && allBankedCorrect) {  
        this.makeItRain();
       

        this.shadowRoot.querySelector('.feedbackArea').innerHTML = ``;
        const bankedTags = this.shadowRoot.querySelectorAll('.correctAnswers .chip');
        for (const tag of bankedTags) {
            allBankedCorrect = false;
            tag.title = tag.dataset.feedback;

            this.shadowRoot.querySelector('.feedbackArea').innerHTML += `<li class="green">${tag.dataset.feedback}</li>`;
          }

      }
     
    }
  }

  
  
    

  
  render() {
    return html`
    <div class= "wrapper">
      <div class= "background">
        <div class= "nonsense">${this.nonsense}</div>
                <div id= "image-slot" ></div>
        <img class = "image" src= ${this.image} >
        <confetti-container id="confetti">


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
          </confetti-container>
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
      nonsense: { type: String, reflect: true},
      
      
    };
  }
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);

