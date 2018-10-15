import React from 'react';

const AnswersList = ({randomqs}) => {
  return (
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
  );
}
export default AnswersList;