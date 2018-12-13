import React, { Component } from 'react';
import Schedule from './components/schedule';
import Login from './components/login';
const options=['BME','BEX','BCE','BEL','BCT','BArch','BAG'];
const years=['I','I-A','I-B','II','II-A','II-B','III','III-A','III-B','IV','IV-A','IV-B'];




class App extends Component {
  
  state={
    department:'BME',
    year:'IV'
  }
  
  render() {
    return (  
      <div>
       <div className='row'>
        <div className='col-md-6'>
            <div className='form-inline'>
          <select className='form-control' value={this.state.department} onChange={(e)=>{this.setState({department:e.target.value}) }}>
            {options.map((s)=><option>{s}</option>)}
          </select>
          <select className='form-control' value={this.state.year} onChange={(e)=>{ this.setState({year:e.target.value}) }}>
            {years.map((s)=><option>{s}</option>)}
          </select>
       </div>
        </div>
        <div className='col'></div>
        <div className='col-md-4'>
          <Login/>
        </div>
       </div>
       
       <div className='mt-2 bordered border shadow'>  
        <Schedule department={this.state.department} year={this.state.year} />
       </div>
      </div>
    );
  }
}

export default App;
