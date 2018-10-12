import React from 'react';
import Subjects from '../Subjects/Subjects';

const SubjectsList = ({subjects, onSelectSubj, checkedval}) => {
  return (
    
    <div>
      {
        subjects.map((s,i)=>{
          return(
            <Subjects check={checkedval} selected={onSelectSubj} key={i} id={s.id} code={s.code}/>
            )
        })
      }
    </div>
  );
}
export default SubjectsList;