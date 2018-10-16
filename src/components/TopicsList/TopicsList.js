import React from 'react';
import Topics from '../Topics/Topics';

const TopicsList = ({topics,onSelectTopic,onShowQuestions}) => {
  return (
    <div>
      {
        topics.map((t,i)=>{
          return(
            <Topics key={i} id={t.tid} name={t.name} selected={onSelectTopic}/>
            )
        })
      }

    </div>
  );
}
export default TopicsList;