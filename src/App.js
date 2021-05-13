import React from 'react';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      text: '', 
      list:[]
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
updateStatus = (index) => {
  const task = this.state.list[index];
  console.log(task)
  task.isCompleted = !task.isCompleted;
   const list = this.state.list.slice();
   list.splice(index,1,task);
   console.log(list);
  this.setState({
    list: list
  })
 
}

  render(){
    
    const allTasks = this.state.list.map((task,index) =>{
    return (
    
    <div key={index}>
      <input type="checkbox" checked={task.isCompleted} onChange={(() => this.updateStatus(index))}/>
      {task.text}</div>
    )
  });
    return (
      <div>
        <input value={this.state.text} onChange={this.changeText} type="text" placeholder="Add new item" ></input>
        <button type="button" onClick={this.addTask}>Add</button>
        <div>
      {allTasks}
        </div>
      
      
      </div>
    )
  }
}
export default App;
