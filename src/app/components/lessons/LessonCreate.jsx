import { connect } from 'react-redux';
import { createLesson } from '../../actions/lessons';
import LessonForm from './LessonForm'


const mapDispatchToProps = (dispatch) => {
  return {
    handleFormSubmit: (formProps) => {
      dispatch(createLesson(formProps));
    }
  }
}

export default connect(null, mapDispatchToProps)(LessonForm)
