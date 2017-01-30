import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/lessons';

class LessonList extends Component {
  componentWillMount() {
    this.props.fetchLessons();

    this.user = JSON.parse(localStorage.getItem('user'));
  }

  renderLessons() {
    let lessons = this.props.lessons;
    if (lessons == null) {
      lessons = [];
    }
    console.log(lessons.data);
    // const lessons = this.props.lessons || [];
    if (lessons.data == null) {
      return null;
    }
    return lessons.data.map((lesson, i) => {
      return <li key={i}>{ lesson.name }</li>
    })
  }

  render() {
    return (
      <div className="content users">
        <h1>Hello { this.user.matrikelNr }</h1>
        <p>Here are auth protected lesson matrikelNr! :)</p>
        <ul>
          { this.renderLessons() }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { lessons: state.lesson.list };
}

export default connect(mapStateToProps, actions)(LessonList);
