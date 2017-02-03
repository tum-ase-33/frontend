import { connect } from 'react-redux';
import { editLesson } from '../../actions/lessons';
import LessonForm from './LessonForm'


const mapDispatchToProps = (dispatch) => {
  return {
    handleFormSubmit: (formProps) => {
      dispatch(editLesson(this.props.params.id, formProps));
    }
  }
}

export default connect(null, mapDispatchToProps)(LessonForm)
