import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/lessons';
import LessonList from './LessonList'

class LessonsPage extends React.Component {
  componentWillMount() {
    // because of connect(actions)
    this.props.fetchLessons();

    // this.user = JSON.parse(localStorage.getItem('user'));
  }
  render() {
    let lessons = this.props.lessons;
    if (lessons == null) {
      lessons = [];
    }
    if (lessons.data == null) {
      return null;
    }
    return (
      <div className="col-md-12">
        <h1>Lessons</h1>
        <div className="col-md-4">
          <LessonList lessons={lessons.data} />
        </div>
        <div className="col-md-8">
          {this.props.children}
        </div>
      </div>
    );
  }
}


function mapStateToProps(state, ownProps) {
  return {
    lessons: state.lesson.list,
  };
}

export default connect(mapStateToProps, actions)(LessonsPage);
