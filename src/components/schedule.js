import React,{Component} from 'react';
import './schedule.css';
import {db} from './../firebase';
const days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

class Adder extends Component{
  state={
    key:'',
    value:''
  }
  onClick(){
    if(this.state.key && this.state.value)
    this.props.onAdd(this.state);this.setState({key:this.state.key.split('-')[1]+'-'});
  }
  render(){
    return <div className='form-inline'>
        <input className='form-control' onChange={(e)=>{this.setState({key:e.target.value})}} value={this.state.key} placeholder='time'/>
        <input className='form-control' onKeyPress={(e)=>{if(e.key=="Enter")this.onClick();}} onChange={(e)=>{this.setState({value:e.target.value})}} placeholder='period'/>
        <button className='btn btn-primary btn-small'  onClick={()=>{this.onClick()
        }}>Add</button>
    </div>
  }
}

class Schedule extends Component{
  state={
    day:1,
    schedules:[],
  }
  
  ref = {};
  _registerListeners(){
      this.ref = db.ref(`class-schedules/${this.props.department}/${this.props.year}/${this.state.day}`);
    
      this.ref.on('child_added',s=>{
          console.log(s.key);
          let v = this.state.schedules;
          console.log(v);
          v.push({key:s.key,value:s.val()});
          this.setState({schedules:v});
      });
      
      this.ref.on('child_removed',s=>{
        let v = this.state.schedules.filter(e=>{return e.key !== s.key});
        this.setState({schedules:v});
      });
  }
  
  _unregisterListeners(){
      if(this.ref!=={})
        this.ref.off();
      
  }
  componentDidMount(){
      this._registerListeners();
  }
  
  componentDidUpdate(prevProps,prevState){
    if(prevProps !== this.props)
    {
      this._unregisterListeners();
      this._registerListeners();
      this.setState({schedules:[]});
    }
    if(prevState.day !== this.state.day)
    {
      this._unregisterListeners();
      this._registerListeners();
      this.setState({schedules:[]});
    }
  }
  
  componentWillUnmount(){
      this._unregisterListeners();
  }
  
  _refresh(){
   window.$("#root").notify("successfully refreshed",{position:'right top'});
    this._unregisterListeners();
    this._registerListeners();
    this.setState(({schedules:[]}));
  }
  
  _deleteHandler(e){
    
    this.ref.child(e).remove().then(()=>{window.$("#root").notify("successfully deleted",{position:'right top'})});
  }
  
  _handleDayChange(d){
      let day = this.state.day + d;
      if(day===7)
        day=1
      if(day ===0)
        day=7;
      
      if(day>7)
        day= day%7;
   
      this.setState({day:day});
  }
  
  render(){
    console.log('rendered');
    return <div>
                <p className='text-center m-0 p-0'>
                <span role='button' onClick={()=>{this._handleDayChange(-1)}}><a href='#'><i className='fa fa-toggle-left text-primary mr-4' role='button'></i></a></span>
                {days[parseInt(this.state.day)-1]}
                <span role='button' onClick={()=>{this._handleDayChange(1)}}><a href='#'><i role='button' className='fa fa-toggle-right text-primary ml-4'></i></a></span>
                </p>
                <a><span onClick={()=>{this._refresh()}} className='pull-right'>Refresh<i className='fa fa-refresh px-2'></i></span></a>
                <div className='clearfix'></div>
                <hr />
                {this.state.schedules.length===0?<p>No Schedules</p>:''}
                <div className='panelWrapper'>
                {this.state.schedules.map(e=><div className='card mb-2'>
                    <div className='card-body'>
                    <h7>{e.value}<br/><small>{e.key}</small></h7>
                    <div class="btn-group pull-right" role="group">
    <button id="btnGroupDrop1" type="button" class="btn btn-unique btn-sm dropdown-toggle" data-toggle="dropdown"
      aria-haspopup="true" aria-expanded="false">
      Actions
    </button>
    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
      <a class="dropdown-item" href="#">Edit</a>
      <a class="dropdown-item" onClick={()=>{this._deleteHandler(e.key)}} href="#">Delete</a>
    </div>
  </div>
                    </div>
                </div>)}
                <a class='' data-toggle='collapse' data-target='#add'>Add New Data</a>
                <div id='add' class='collapse'>
                  <Adder onAdd={(e)=>{this.ref.child(e.key).set(e.value);}}/>
                </div>
                </div>
            </div>
  }
  
}


export default Schedule;