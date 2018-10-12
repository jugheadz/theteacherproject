import React from 'react';
import Questions from '../Questions/Questions';

const QuestionsList = ({questions}) => {
  return (
    <div className='question'>
      {
        questions.map((qs,i)=>{
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
  );
}
export default QuestionsList;