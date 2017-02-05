import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/lessons';
import LessonForm from './LessonForm';


class LessonCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lesson: {
        name: '',
      },
      saving: false
    };
    //this.redirect = this.redirect.bind(this);
    this.saveLesson = this.saveLesson.bind(this);
    this.updateLessonGroups = this.updateLessonGroups.bind(this);
    this.updateLessonState = this.updateLessonState.bind(this);
  }

  updateLessonGroups(event) {
  //  const lesson = this.state.lesson;
  //  const lessonId = event.target.value;

  //  this.setState({cat: cat});
  }

  updateLessonState(event) {
    const field = event.target.name;
    const lesson = this.state.lesson;
    lesson[field] = event.target.value;
    return this.setState({ lesson });
  }

  saveLesson(event) {
    event.preventDefault();
    this.props.actions.createLesson(this.state.lesson)
  }

  render() {
    return (
      <div>
        <h1>new Lesson</h1>
        <LessonForm
          lesson={this.state.lesson}
          onSave={this.saveLesson}
          onChange={this.updateLessonState}
        />
      </div>
    );
  }
}


LessonCreate.propTypes = {
  actions: PropTypes.object.isRequired
};


function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}


export default connect(null, mapDispatchToProps)(LessonCreate);
