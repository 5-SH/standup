import React, { Component } from 'react';
import GroupAdd from './GroupAdd';
import GroupCard from './GroupCard'
import './GroupList.css';
import FirebaseDao from './FirebaseDao';
import config from './config';
import Slider from 'react-slick';
import 'slick-carousel';

const dao = new FirebaseDao(config);

// RenderGroupCardList Component
class RenderGroupCardList extends  Component{
  constructor(props){
    super(props);
    this.groupDOMs = [];
    this.settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
  }
  componentWillMount(){
    for (const title in this.props.groups) {
      if(this.props.groups.hasOwnProperty(title))
        this.groupDOMs.push(
          <div key={title}>
            <GroupCard imageUrl={this.props.groups[title]["logoUrl"]}
                       title={title} />
          </div>);
    }
  }
  render(){
    return (
      <Slider {...this.settings}>
        {this.groupDOMs}
      </Slider>
    );
  }
}

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.groups = undefined;
    this.state = {
      isPop: false,
      isLoaded: false
    }
  }
  componentWillMount(){
    dao.groupList.on('value',(snapshot)=> {
      this.setState({
        groups: {...snapshot.val()},
        isLoaded: true
      });
    });
  }
  popGroupAdd(isPop) {
    this.setState({ isPop });
  }
  // componentWillMount()

  render() {
    return (
      <div className="group-chooser">
        {this.state.isLoaded &&
          <RenderGroupCardList groups={this.state.groups}/>
        }
        <button onClick={ () => this.popGroupAdd(true) } className="groupAddBtn">
          <i className="fa fa-plus-circle">새 그룹</i>
        </button>
        {this.state.isPop &&
          <GroupAdd popGroupAdd={ (isPop) => this.popGroupAdd(isPop) } />
        }
      </div>
    )
  }
}

export default GroupList;