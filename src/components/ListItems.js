import React,{Component} from 'react';
import './ListItems.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import  FlipMove from 'react-flip-move';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ListItems extends Component {
    constructor(props){
        super(props);
        this.state={

        }

    }
 render(){
        const items = this.props.items;
        const newList = items.map(item=> {
          //if the the task is a pending one
            if(item.status === false) {
                console.log('yep it is false');
                return( <div
                    className="list-group-item list-group-item-action list-group-item-secondary list-group-item-size pl-5 pb-4"
                    key={item.key}>
                    <h5><input type="text" className="list-item-text" id={item.key} value={item.text} onChange={(e) => {
                        this.props.setUpdate(e.target.value, item.key);
                    }}/>
                        <span><FontAwesomeIcon className="trash-icon" icon="trash"
                                               onClick={() => this.props.deleteItem(item.key)}></FontAwesomeIcon>
                           <FontAwesomeIcon className="check-icon" icon="check-square"
                                            onClick={() => {
                                                this.props.setCompletedItem(item);
                                                toast.configure();
                                                toast.success('Great !!! you have completed the task',{
                                                    position:toast.POSITION.TOP_CENTER,
                                                    autoClose:3000
                                                });

                                            }}
                           ></FontAwesomeIcon>
                       </span>
                    </h5>



                </div>)
            }
            //if the the task is a completed one
            else{

                return <div
                    className="list-group-item list-group-item-action list-group-item-secondary list-group-item-size pl-5 pb-4"
                    key={item.key}>

                    <h5 className="cross-task" id={item.key} ><span className="completed-list-item-text">{item.text}</span></h5>


                       <h5 className="completed-items-decoration"> <span className="completed-items-decoration"><FontAwesomeIcon className="trash-icon" icon="trash"
                                               onClick={() => this.props.deleteItem(item.key)}></FontAwesomeIcon>
                           <FontAwesomeIcon className="completed-check-icon" icon="check-square"
                                           ></FontAwesomeIcon>
                       </span></h5>



                </div>

            }
            }

        )
     return(
         <div>
             {/*animation to move list item smoothly*/}
             <FlipMove duration={300} easing="ease-in-out">
              {newList}
             </FlipMove>
         </div>

     )
 }
}

export default ListItems;