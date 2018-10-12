import React from 'react';

const Choices = (props) => {
  const {choices, answer} = props;
  let newChoices = choices.split(',')
  newChoices.push(answer);
  let shuffledChoices = newChoices
  .map((a) => ({sort: Math.random(), value: a}))
  .sort((a, b) => a.sort - b.sort)
  .map((a) => a.value);

  return (
    <div>
    {
        shuffledChoices.map((choice,i) => {
          return <li key={i}>{choice}</li>
        })
    }
    </div>
  );
}

export default Choices;