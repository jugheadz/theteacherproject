import React from 'react';

const Topics = (props) => {
  const {id, name, selected} = props;

  return (
    <div>
      <input 
      className='topics'
      type="checkbox" 
      id={id} 
      name={name} 
      value={id} 
      onChange={selected}
      />
      {name}
    </div>
  );
}

export default Topics;