import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";


export class TaggingQuestion extends DDD {

  static get tag() {
    return 'tagging-question';
  }
  
  constructor() {
    super();
    this.question = "idk atm";
    this.image = "";  //"https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRPgSRgEYJ3lY8Ky8wNqfoJqWe2U2VMe-RIKbO_0HSXGj5sHA-_"
    
     
  }

  
  static get styles() {
    return css`
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        
      }

      .background{
        background-color: var(--ddd-theme-default-beaver70);
        padding: 8px;
        display:flex;
        height: 300px;
        width: 600px;
        flex-direction: column;
      }

      .image{
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
      <div class= "background">
        <img class= "image" src= ${this.image} >
          <div class="question">Question: ${this.question}</div>


        
      </div>
    </div>

    
    `;

  }

  static get properties() {
    return {
      question: { type: Array },            
      
    };
  }
}

globalThis.customElements.define(TaggingQuestion.tag, TaggingQuestion);