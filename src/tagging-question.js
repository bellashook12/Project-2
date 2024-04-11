import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";


export class TaggingQuestion extends DDD {

  static get tag() {
    return 'tagging-question';
  }
  
  constructor() {
    super();
    
     
  }

  add(e){

  }
  static get styles() {
    return css`
      :host {
        display: inline-flex;
        
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
      <div class= "question">
        <p>hello</p>
      
      </div>
    </div>

    
    `;

  }

  static get properties() {
    return {
      characters: { type: Array },
      numChar: { type: Number, reflext: true},
      message:{type:String,reflect:true},
            
      
    };
  }
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);