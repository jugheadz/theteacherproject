import React from 'react';
import Choices from '../Choices/Choices';

const Questions = (props) => {
  const {question, choices, answer,num} = props;
  return (
      <div>
  		<p>{num+1}. {question}</p>
      		<ol type='A'>
      			<Choices choices={choices} answer={answer}/>
      		</ol>
      </div>
  );
}

export default Questions;