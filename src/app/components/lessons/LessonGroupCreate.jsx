import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import * as actions from '../../actions/lessons';
import LessonGroupForm from './LessonGroupForm';
import {START_DATE, END_DATE} from 'react-dates/constants';


class LessonGroupCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lessonGroup: {
        name: '',
        dates: [],
      },
      saving: false,
      startDate: moment(),
      endDate: moment(),
      focusedInput: START_DATE
    };
    this.saveLessonGroup = this.saveLessonGroup.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onFocusChange = this.onFocusChange.bind(this);
    this.updateLessonGroupState = this.updateLessonGroupState.bind(this);
  }


  updateLessonGroupState(event) {
    const field = event.target.name;
    const lessonGroup = this.state.lessonGroup;
    lessonGroup[field] = event.target.value;
    return this.setState({ lessonGroup });
  }
  onDateChange(date) {
    const startDate = date.startDate;
    const endDate = date.endDate;
    const lessonGroup = this.state.lessonGroup;
    console.log(date);
    this.setState({startDate:startDate, endDate:endDate });
    if(date.endDate != null && date.startDate !==null){
    const difference = endDate.diff(startDate, 'weeks');
    console.log(difference);
    let dateArray = [];
    let i = 0;
    let currentDate = startDate.clone();
    while (i < difference) {
      dateArray[i] = currentDate.toDate().getTime();
      currentDate = currentDate.add(1, 'weeks');
      console.log("currentDate");
      console.log(currentDate.toDate().getTime());
      i += 1;
    }
    console.log("dates")
    console.log(dateArray);
    lessonGroup.dates = dateArray;
    this.setState({ lessonGroup });
    console.log(this.state.lessonGroup.dates)

  }
    //const lessonGroup = this.state.lessonGroup;
    //lessonGroup.dates = date;
    //this.setState({ startDate });
  }
  onFocusChange(focused){
    console.log("focused")
    console.log(focused);
    this.setState({focusedInput:focused})
  }
  saveLessonGroup(event) {
    event.preventDefault();
    this.props.actions.createLessonGroup(this.state.lessonGroup, this.props.lessonId)
  }

  render() {
    return (
      <div>
        <h1>new Lesson Group</h1>
        <LessonGroupForm
          lessonGroup={this.state.lessonGroup}
          onSave={this.saveLessonGroup}
          onChange={this.updateLessonGroupState}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          focusedInput={this.state.focusedInput}
        />
      </div>
    );
  }
}


LessonGroupCreate.propTypes = {
  actions: PropTypes.object.isRequired,
  lessonId: PropTypes.string.isRequired,

};

function mapStateToProps(state, ownProps) {
  const lessonId = ownProps.params.id;
  return { lessonId };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(LessonGroupCreate);
