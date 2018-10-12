import React, { Component } from 'react';
import './App.css';
import QuestionsList from './components/QuestionsList/QuestionsList';
import SubjectsList from './components/SubjectsList/SubjectsList';
import TopicsList from './components/TopicsList/TopicsList';

const initState = {
  questions:[],
  subjects:[],
  selsub:'',
  seltop:[],
  topics:[],
  filteredq:[],
  answerkeys:[]
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
    const filteredQuestions = this.state.questions.filter(q =>{
      return newSelTop.includes(q.tid.toString())
    })
    let shuffledFilteredQs = filteredQuestions
    .map((a) => ({sort: Math.random(), value: a}))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
    // console.log(filteredQuestions, 'filter')
    // console.log(shuffledFilteredQs, 'shuffled qs')
    this.setState({seltop:newSelTop, filteredq:shuffledFilteredQs})
    const answerkeys = shuffledFilteredQs.map(ans=>ans.answer)
    console.log(answerkeys)
  }
  onShowAnswers = () => {
    
  }
  componentDidMount () {
    this.loadAllQuestions()
    this.loadAllSubjects()
  }
  render() {
    const {questions,subjects,selsub,topics,seltop,filteredq} = this.state
    console.log(filteredq)
    return (
      <div className="App">
      <SubjectsList checkedval={selsub} onSelectSubj={this.onSelectSubj} subjects={subjects}/>
      <TopicsList topics={topics} onSelectTopic={this.onSelectTopic}/>
      <QuestionsList questions={filteredq}/>
      </div>
    );
  }
}

export default App;
