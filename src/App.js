import React from 'react';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      text: '', 
      list:[],
      filter:'all'
    }
  }

  changeText = (event) => {
 
    this.setState({
      text: event.target.value
    })
  }

  addTask = () => {
    const newTask = {
      text: this.state.text,
      isCompleted:false
    }
    this.setState({
      list:this.state.list.concat(newTask),
      text:''
    });
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

   /*Working with task object */
  this.setState({
    list: this.state.list.map((taskItem)=> {
           return taskItem === task ? {...taskItem, isCompleted: !taskItem.isCompleted} : taskItem
      })
  })
}

changeFilter = (e) => {

  this.setState({
    filter: e.target.value
  })
}

handleSubmit = (e) => {
  e.preventDefault();
 // debugger;
  this.addTask();
}

  render(){
    
    const allTasks = this.state.list.filter(task => {
      //if(this.state.filter === 'all') {return true;}
      if(this.state.filter === 'active'){return !task.isCompleted}
      if(this.state.filter === 'completed'){return task.isCompleted}
      return true;//filter 'all'
    })
    .map((task,index) =>{
    return (
    <div key={index}>
      <input type="checkbox" checked={task.isCompleted} onChange={() => this.updateStatus(task)}/>
      {task.text}</div>
    )
  });
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
        <input value={this.state.text} onChange={this.changeText} type="text" placeholder="Add new item" ></input>
        <button type="button" onClick={this.addTask}>Add</button>
        <select value={this.state.filter} onChange={this.changeFilter}>
          <option value={'all'}>All</option>
          <option value={'active'}>Active</option>
          <option value={'completed'}>Completed</option>
        </select>
      </form>
        <div>
      {allTasks}
        </div>
      
      
      </div>
    )
  }
}
export default App;
