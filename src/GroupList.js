import React, { Component } from 'react';
import GroupAdd from './GroupAdd';
import './GroupList.css';

// RenderGroupCardList Component

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.groups = undefined;
    this.state = {
      isPop: false,
      // isLoaded: false
    }
  }
  popGroupAdd(isPop) {
    this.setState({ isPop });
  }
  // componentWillMount()

  render() {
    return (
      <div className="group-chooser">
        {/* RenderGroupCardList */}
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