import React, { Component } from 'react';
import './App.css';
import QuestionsList from './components/QuestionsList/QuestionsList';
import SubjectsList from './components/SubjectsList/SubjectsList';
import TopicsList from './components/TopicsList/TopicsList';
import AnswersList from './components/AnswersList/AnswersList';

const initState = {
  questions:[],
  subjects:[],
  selsub:'',
  seltop:[],
  topics:[],
  filteredq:[],
  answerkeys:[],
  randomqs:[]
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
  loadAllSubjects = () => {
    fetch('http://localhost:3000/subjects/all')
      .then(response => response.json())
      .then(subjects => {this.setState({ subjects:subjects })})
      .catch(console.log)
  }
  loadSubjectTopics = (sid) => {
    fetch(`http://localhost:3000/subjects/${sid}/topics`)
      .then(response => response.json())
      .then(topics => {this.setState({ topics:topics })})
      .catch(console.log)
  }
  onSelectSubj = (event) => {
    //uncheck all topics checkbox
    this.setState({topics:[], filteredq:[], seltop:[]})
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
  onShowAnswers = () => {
    
  }
  componentDidMount () {
    this.loadAllQuestions()
    this.loadAllSubjects()
  }
  render() {
    const {subjects,selsub,topics,randomqs,seltop} = this.state
  
    return (
      <div className="App">
      <SubjectsList checkedval={selsub} onSelectSubj={this.onSelectSubj} subjects={subjects}/>
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
