import React from 'react';

const Choices = (props) => {
  const {choices} = props;

  return (
    <div>
    {
        Object.values(choices).map((choice,i) => {
          return <li key={i}>{choice}</li>
        })
    }
    </div>
  );
}

export default Choices;