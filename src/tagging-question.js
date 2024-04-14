import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";


export class TaggingQuestion extends DDD {

  static get tag() {
    return 'tagging-question';
  }
  
  constructor() {
    super();
    this.question = "idk atm";
    
     
  }

  
  static get styles() {
    return css`
      :host {
        display: flex;
        
      }

      .question {
        color: black;
        font-size: 24px; 
      }

  `;
  }

  
  render() {
    return html`
    <div class= "wrapper">
      <div class= "backgroud">
        <div class="question">Question : ${this.question}</div>

        
      </div>
    </div>

    
    `;

  }

  static get properties() {
    return {
      characters: { type: Array },            
      
    };
  }
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);