import { html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";


export class TaggingQuestion extends DDD {

  static get tag() {
    return 'tagging-question';
  }
  
  constructor() {
    super();
    this.question = "Which of the following big ideas would YOU associate with this artistic work?";
    this.image = "https://private-user-images.githubusercontent.com/329735/320881436-b1e940c9-b838-4e0f-acfb-2d354926bc8d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTMyODUzOTcsIm5iZiI6MTcxMzI4NTA5NywicGF0aCI6Ii8zMjk3MzUvMzIwODgxNDM2LWIxZTk0MGM5LWI4MzgtNGUwZi1hY2ZiLTJkMzU0OTI2YmM4ZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNDE2JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDQxNlQxNjMxMzdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wZTc4YjA1NWZhYmE0MWNiNWVkOGFiNmZhZTU4Nzg3NDJmOTQxYmNhY2MwMDg3YWNhMDQyYzQ5N2NjN2E1NzI1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.YVplTmO04YCMAImA0GGmFG5bU2UBpI-I1Cy2LoR7bPs";  
    
     
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
        height: 600px;
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

      .answers-drop-box{
        padding: 16px;
        
      }

      .answers-start-box{
        padding: 16px;
      }

  `;
  }

  
  render() {
    return html`
    <div class= "wrapper">
      <div class= "background">
        <img class= "image" src= ${this.image} >
          <div class="question">Question: ${this.question}</div>
            <div class="answers-drop-box">Drop Answers Here</div>
              <div class="answers-start-box">Drag These Answers</div>


        
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