import React, { Component } from 'react';
import './App.css';
import QuestionsList from './components/QuestionsList/QuestionsList';
import SubjectsList from './components/SubjectsList/SubjectsList';
import TopicsList from './components/TopicsList/TopicsList';
//import AnswersList from './components/AnswersList/AnswersList';

const initState = {
  questions:[],
  subjects:[],
  selsub:'',
  seltop:[],
  topics:[],
  filteredq:[],
  answerkeys:[],
  randomqs:[],
  substops:[]
}

class App extends Component {
  constructor(){
    super()
    this.state = initState
  }
  loadAllQuestions = () => {
    fetch('http://localhost:3000/questions/all')
      .then(response => response.json())
      .then(questions => {this.setState({ questions:questions })})
      .catch(console.log)
  }
  // loadAllSubjects = () => {
  //   fetch('http://localhost:3000/subjects/all')
  //     .then(response => response.json())
  //     .then(subjects => {this.setState({ subjects:subjects })})
  //     .catch(console.log)
  // }
  
  loadAllSubjectsTopics = () => {
    fetch('http://localhost:3000/subjects/topics/all', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        uid:2
      })
      })
      .then(response => response.json())
      .then(substops => {this.setState({ substops:substops })})
      .catch(console.log, 'load subject topics')
  }
  loadSubjectTopics = (sid) => {
    const topics = this.state.substops.filter(t=>{
      return t.subid === Number(sid)
    })
    this.setState({topics:topics})
  }
  loadSubjectTopicQs = () => {
    
  }
  onSelectSubj = (event) => {
    //uncheck all topics checkbox
    this.unCheckAll()
    this.setState({topics:[], randomqs:[], seltop:[]})
    if(event.target.checked){
      this.setState({
        selsub: event.target.value
      });
      this.loadSubjectTopics(event.target.value)
    }
  }
  onSelectTopic = (event) => {
    let newSelTop = this.state.seltop
    if(event.target.checked){
      newSelTop.push(event.target.value)
    }else{
      newSelTop = this.state.seltop.filter(e => e !== event.target.value)
    }
    this.setState({seltop:newSelTop})
  }
  loadQuestions = () => {
    const {seltop,questions} = this.state

    const filteredQuestions = questions.filter(q =>{
      return seltop.includes(q.tid.toString())
    })
    let shuffledFilteredQs = this.shuffleArr(filteredQuestions)

    const newQs = shuffledFilteredQs.map(q=> {
    let choices = q.choices.concat(',',q.answer)
    let choicesarr = choices.split(',')
    let shuffledChoices = this.shuffleArr(choicesarr)
    let answerID = shuffledChoices.indexOf(q.answer)
      return Object.assign({}, q, {
            choices:{
              A:shuffledChoices[0],
              B:shuffledChoices[1],
              C:shuffledChoices[2],
              D:shuffledChoices[3]
            },
            answerID: this.convertAnsIdToLet(answerID)
          })
    })
    this.setState({randomqs:newQs})
  }
  unCheckAll = () => {
        var items = document.getElementsByClassName('topics');
        for (var i = 0; i < items.length; i++) {
            if (items[i].type === 'checkbox')
                items[i].checked = false;
        }
    } 
  convertAnsIdToLet = (data) => {
    if(data === 0){
      return "A"
    }else if(data === 1){
      return "B"
    }else if(data === 2){
      return "C"
    }else if(data === 3){
      return "D"
    }else{
      return
    }
  }
  shuffleArr = (data) => {
    let shuffled = data.map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
    return shuffled;
  }
  componentDidMount () {
    this.loadAllQuestions()
    //this.loadAllSubjects()
    this.loadAllSubjectsTopics()
  }
  render() {
    const {selsub,topics,randomqs,seltop,substops} = this.state
    console.log(seltop)
    return (
      <div className="App">
      <SubjectsList checkedval={selsub} onSelectSubj={this.onSelectSubj} subjects={substops}/>
      <TopicsList topics={topics} onSelectTopic={this.onSelectTopic} onShowQuestions={this.loadQuestions}/>
      {
        seltop.length >= 1 
        ? 
        <div>
          <input onClick={this.loadQuestions} type="submit" value="Show Questions"/>
        </div>
        : <div></div>
      }
      <QuestionsList randomqs={randomqs}/>
      
      </div>
    );
  }
}

export default App;
