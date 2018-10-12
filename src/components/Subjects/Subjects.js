import React from 'react';

const Subjects = (props) => {
  const {id, code, selected, check} = props;
  return (
      <div>
      <input type="radio" name={code} value={id} checked={parseInt(check)===id} onChange={selected}/>
      {code}
      </div>
  );
}

export default Subjects;