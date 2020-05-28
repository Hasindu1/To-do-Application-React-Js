import React,{Component} from 'react';
import './DateTime.css';

class DateTime extends Component {
    constructor(props){
        super(props);
        this.state={

        }

    }
    render() {
        let today = new Date();

        let months = new Array(12);
        months[0] = "jan";
        months[1]="feb";
        months[2]="Mar";
        months[3]="Apr";
        months[4]="May";
        months[5]="Jun";
        months[6]="Jul";
        months[7]="Aug";
        months[8]="Sep";
        months[9]="Oct";
        months[10]="Nov";
        months[11]="Dec";

        let days= new Array(7);
        days[0]="Sunday";
        days[1]="Monday";
        days[2]="Tuesday";
        days[3]="Wednesday";
        days[4]="Thursday";
        days[5]="Friday";
        days[6]="Saturday";

        let month = months[today.getMonth()];//Getting the month name
        let date = today.getDate();//getting the date
        let day = days[today.getDay()];//getting the name of the day
        // console.log("today is " + today.getDay());
        // console.log('day is'  + day);
        return(<div id="date-time">{day +" ," +month +" " + date}</div>);




    }
    }
    export default DateTime;