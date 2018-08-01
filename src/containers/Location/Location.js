import React, {Component} from 'react'
import TopNavbar from '../TopNavbar/TopNavbar';

class Location extends Component {


    addHandler = () => {
        console.log('add location');
    }
    removeHandler = () => {
        console.log('remove location');
    }

    render() {
        return(
            <div>
                 <TopNavbar status='category' add={this.addHandler} remove={this.removeHandler}/>
                <h1>Location</h1>
            </div>
        )
    }
}

export default Location;