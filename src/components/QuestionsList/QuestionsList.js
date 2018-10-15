import React from 'react';
import Questions from '../Questions/Questions';

const QuestionsList = ({randomqs}) => {
  return (
    <div>
    <div className='question'>
      {
        randomqs.map((qs,i)=>{
            return (
              <Questions
                key={i}
                num={i}
                id={qs.qid} 
                question={qs.question} 
                choices={qs.choices}
                answer={qs.answer}
              />
            );
          })
      }
    </div> 
    <div className='answers'>
    {
      randomqs.length === 0 ? (<div></div>) : (<h2>Answer Keys</h2>)  
    }
    <ol>
      {
        randomqs.map((a,i)=>{
            return (
              <li key={i}>{a.answerID}</li>
            );
          })
      }
    </ol>
    </div>
    </div>
  );
}
export default QuestionsList;

