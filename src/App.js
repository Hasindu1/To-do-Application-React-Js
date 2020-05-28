import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ListItems from "./components/ListItems";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {faCheckSquare} from "@fortawesome/free-solid-svg-icons";
import DateTime from "./components/DateTime";


library.add(faTrash);
library.add(faCheckSquare);


class App extends Component{
    constructor(props){
     super(props);

     this.state={
         items:[],//will hold the to do list
         currentItem:{
         text:'',//will hold user's input (task)
         key:'',//will hold unique key to identify a task uniquely
         status:false//status will hold a boolean value based on the task's pending or completed state
         }
    }
    //using the bind() method to bind above methods with this
this.handleInput = this.handleInput.bind(this);
this.addItem = this.addItem.bind(this);
this.deleteItem= this.deleteItem.bind(this);
this.setUpdate=this.setUpdate.bind(this);
this.setCompletedItem=this.setCompletedItem.bind(this);

    }
  render(){
    return (
        <React.Fragment>
        <div className="background-view"> <div id="main-container" >


            <div className="img-container"></div>

            <DateTime></DateTime>
            <div className="container">
                <form className="form-inline row " onSubmit={this.addItem}>

                    <div className="form-group col-sm-7 ml-3">

                        <input type="text" className="form-control   add-item-input " id="inputTask" placeholder="Enter the task"
                               value={this.state.currentItem.text} onChange={this.handleInput}/>
                    </div>
                    <div className=" text-center col-sm-3 ml-2">
                        <button id="add-btn" className="btn btn-primary btn-sm add  " type="submit">ADD</button>
                    </div>
                </form>
            </div>
            {/*Passing the props to ListItems component and using the ListItems componenet*/}
            <ListItems items ={this.state.items}
                       deleteItem={this.deleteItem}
                       setUpdate={this.setUpdate}
                       setCompletedItem={this.setCompletedItem}></ListItems>


        </div>
        </div>

        </React.Fragment>


    );
  }
  handleInput(e){
        this.setState(
            {
                currentItem:{
                    text:e.target.value,
                    key:Date.now(),
                    status:false
                }
            }

        )
  }
  //To add a new task to the list
  addItem(e){
        e.preventDefault();
        const newItem = this.state.currentItem;
        console.log(newItem);
        //Check if the user inputted text has a value
        if(newItem.text !== ""){

            let newItems = this.state.items;
            let count =0;
            //checking the number of completed tasks in the list
             newItems.map(item=>{
                if(item.status === true){
                  count ++;
                }
            })
            //console.log('count is' + count);
            //Dividing the the already completed tasks and pending tasks to to seperate arrays and storing them
            //Arr1  array will hold the pending tasks
            //Arr2 array will hold the completed tasks
            //updatedArr array will hold the completed list of task(Combination of Arr1 and Arr2 arrays)
           if(count > 0){
               let finalPendingElement = newItems.length -count;

               let tempArr2 = new Array();
               console.log('passed');
               for(let i = 0 ; i< count ; i++){
                   tempArr2[i] = newItems[finalPendingElement + i];
               }

               let tempArr1=new Array();

               for(let i = finalPendingElement ; i >= 0 ;--i){
                   tempArr1[i] = newItems[i];
               }
               tempArr1[finalPendingElement] = newItem;
               console.log('tempArr1 is' + tempArr1);
               const reversedArr= tempArr1.reverse();
               const updatedArr = reversedArr.concat(tempArr2);
               //updating the state
               this.setState({
                   items:updatedArr,
                   currentItem:{
                       text:'',
                       key:'',
                       status:false
                   }
               });

           }
        //If there are no completed taks in the list no need to think about the list re structuring
        else {
               newItems[newItems.length] = newItem;
               const reversedArr= newItems.reverse();
               this.setState({
                   items: reversedArr,
                   currentItem: {
                       text: '',
                       key: '',
                       status: false
                   }
               });
               console.log("this is the array" + this.state.items);
           }

        }

  }
  //To delete a task
  deleteItem(key){
        const filteredItems = this.state.items.filter(item=>item.key!==key);
        this.setState({
            items:filteredItems
        })
  }
  //To update a task
  setUpdate(text,key){
        const items = this.state.items;
        items.map(item=>{
            if(item.key === key){
                item.text = text;
                item.status=false;
            }
        })
      this.setState({
          items:items
      })
  }
  //setting the completed items
  setCompletedItem(completedItem){
      let filteredItems = this.state.items.filter(item=>item.key!==completedItem.key);
      completedItem.status = true;
      filteredItems[filteredItems.length] =completedItem;
      this.setState({
          items:filteredItems
      })


  }

}

export default App;
