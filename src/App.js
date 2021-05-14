import React from 'react';
import './App.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      text: '', 
      list:[],
      filter:'all',
      count: 0
     
    }
  }

  changeText = (event) => {
 
    this.setState({
      text: event.target.value
    })
  }

  addTask = () => {
    if(this.state.text.trim()){ //trim - method of cleaning spaces on string
      const newTask = {
      text: this.state.text,
      isCompleted:false,
     
    }
    this.setState({
      list:this.state.list.concat(newTask),
      text:''
      // count: this.state.list.filter((status) => !status.isCompleted).length
     
    });
  
    } else {
      this.setState({
        text:''
      });
      
    }
  }
updateStatus = (task) => {
  /*Working with index */
  /*Option 1 */
  // const task = this.state.list[index];
  // task.isCompleted = !task.isCompleted;
  //  const list = this.state.list.slice();
  //  list.splice(index,1,task);
  
  /* Option 2 */
  // this.setState({
  //   list: this.state.list.map((taskItem)=> {
  //          return taskItem === task ? {text:taskItem.text, isCompleted: !taskItem.isCompleted} : taskItem
  //     })
  // })
console.log(this.state.list)
   /*Working with task object */
  this.setState({
    list: this.state.list.map((taskItem)=> {
           return taskItem === task ? {...taskItem, isCompleted: !taskItem.isCompleted} : taskItem
      })
      // count: this.state.list.filter((status) => !status.isCompleted).length
  })
}

changeFilter = (e) => {
  //console.log(e.target.value)
  this.setState({
    filter: e.target.value
  })
}

handleSubmit = (e) => {
  e.preventDefault();
 // debugger;
  this.addTask();
}

//func delete to TASK prompt('dsdsd');
// const userInput = window.confirm('are you ok?');
// console.log(userInput);
remuveTask = (task) => {
  if (!task.isCompleted){
    const confirmed = window.confirm('Are you sure? The task is not completed yet');
    if(confirmed)
    {
      this.setState({
        list:this.state.list.filter(taskItem => !(taskItem === task))
      });
    }
  } else {
    this.setState({
      list:this.state.list.filter(taskItem => !(taskItem === task))
    });
  }

}

  render(){

    const allTasks = this.state.list.filter(task => {
      //if(this.state.filter === 'all') {return true;}
      if(this.state.filter === 'active'){
        return !task.isCompleted}
      if(this.state.filter === 'completed'){return task.isCompleted}
      return true;//filter 'all'
    })
    .map((task,index) =>{
      
    return (
    <div key={index}>
      <input type="checkbox" checked={task.isCompleted} onChange={() => this.updateStatus(task)}/>
      <span className={task.isCompleted ? 'complited dis' : 'dis' }>{task.text}</span>
      <button className='button' onClick = {() => this.remuveTask(task)}>X</button>
      </div>
    )
  });
    const compQuant =  this.state.list.filter((status) => !status.isCompleted).length;
    const counts = (!compQuant ? 'Your list is empty' : `${compQuant} items left from ${this.state.list.length}`);
    


    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input value={this.state.text} onChange={this.changeText} type="text" placeholder="Add new item" ></input>
        <button type="button" onClick={this.addTask}>Add</button>
       
      </form>
        <div>
      {allTasks}
        </div>
      <div>{counts}</div>
      
      <form>
        <button name='all' value='all' type="button" onClick={this.changeFilter}>All</button>
        <button name='active' value='active' type="button" onClick={this.changeFilter}>Active</button>
        <button  name='completed' value='completed' type="button" onClick={this.changeFilter}>Completed</button>
      </form>
      
      {/* <select value={this.state.filter} onChange={this.changeFilter}>
          <option value={'all'}>All</option>
          <option value={'active'}>Active</option>
          <option value={'completed'}>Completed</option>
        </select> */}
      </div>
    )
  }
}
export default App;
