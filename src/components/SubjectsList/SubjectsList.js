import React from 'react';
import Subjects from '../Subjects/Subjects';

const SubjectsList = ({subjects, onSelectSubj, checkedval}) => {
  let subs = [];
  const filteredSubs = subjects.map(s=>{
    let i = subs.findIndex(x => x.id === s.subid)
    if(i <= -1){
      subs.push({id:s.subid, code:s.code})
    }else{
      return s
    }
  })
  //to be reviewed
  return (
    <div>
      {
        subs.map((s,i)=>{
          return(
            <Subjects 
            check={checkedval} 
            selected={onSelectSubj} 
            key={i} 
            id={s.id} 
            code={s.code}/>
            )
        })
      }
    </div>
  );
}
export default SubjectsList;

