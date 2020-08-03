import React, { Component } from 'react';
import GroupAdd from './GroupAdd';
import GroupCard from './GroupCard'
import './GroupList.css';
import FirebaseDao from './FirebaseDao';
import config from './config';
import Slider from 'react-slick';
import 'slick-carousel';

const dao = new FirebaseDao(config);

class RenderGroupCardList extends Component{
  constructor(props){
    super(props);
    this.settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    this.state = {
      groupDOMs: [],
    }
  }
  createNewDOMs() {
    const newDOMs = [];
    for (const title in this.props.groups) {
      if (this.props.groups.hasOwnProperty(title))
        newDOMs.push(
          <div key={title}>
            <GroupCard imageUrl={this.props.groups[title]["logoUrl"]}
                       title={title} />
          </div>);
    }
    return newDOMs;
  }
  componentWillMount(){
    this.setState({
      groupDOMs: [...this.createNewDOMs()]
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.groups !== prevProps.groups) {
      this.setState({
        groupDOMs: [...this.createNewDOMs()]
      })
    }
  }
  render(){
    return (
      <Slider {...this.settings}>
        {this.state.groupDOMs}
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
    dao.groupList.on('value', snapshot => {
      console.log('grouplist value', {...snapshot.val()});
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
  renderGroupAdd() {
    if (this.state.isPop) {
      return <GroupAdd popGroupAdd={ (isPop) => this.popGroupAdd(isPop) } />;
    }
  }
  render() {
    return (
      <div>
        <div className="group-chooser">
          {this.state.isLoaded &&
            <RenderGroupCardList groups={this.state.groups}/>
          }
          <button onClick={ () => this.popGroupAdd(true) } className="groupAddBtn">
            <i className="fa fa-plus-circle">새 그룹</i>
          </button>
        </div>
        {this.renderGroupAdd()}
      </div>
    )
  }
}

export default GroupList;