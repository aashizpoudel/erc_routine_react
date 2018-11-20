import React, { Component } from 'react';
import Schedule from './components/schedule';

const options=['BME','BEX','BCE','BEL'];
const years=['I','II','III','IV'];

class App extends Component {
  
  state={
    department:'BME',
    year:'IV'
  }
  
  render() {
    return (  
      <div>
       <div className='form-inline'>
          <select className='form-control' value={this.state.department} onChange={(e)=>{this.setState({department:e.target.value}) }}>
            {options.map((s)=><option>{s}</option>)}
          </select>
          <select className='form-control' value={this.state.year} onChange={(e)=>{ this.setState({year:e.target.value}) }}>
            {years.map((s)=><option>{s}</option>)}
          </select>
       </div>
       
       <div className='mt-2 bordered border shadow'>  
        <Schedule department={this.state.department} year={this.state.year}/>
       </div>
      </div>
    );
  }
}

export default App;
