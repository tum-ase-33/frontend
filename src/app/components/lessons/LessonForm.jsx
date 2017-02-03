import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions/lessons';


const renderField = ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className={`input-group ${touched && error ? 'has-error' : ''}`}>
    <input type={type} placeholder={placeholder} {...input} />
    { touched && error && <div className="form-error">{error}</div> }
  </div>
);

class LessonForm extends Component {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleFormSubmit(formProps) {
    this.props.handleFormSubmit(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="form-container">
        <h1>Lesson</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit)}>

          {/* name */}
          <Field name="name" component={renderField} type="text" placeholder="Lesson name" />

          {/* Server error message */}
          <div>
            { this.props.errorMessage && this.props.errorMessage.lesson &&
                <div className="error-container">Oops! { this.props.errorMessage.lesson }</div> }
          </div>

          {/* Submit button */}
          <button type="submit" className="btn">Send</button>

        </form>
      </div>
    )
  }
}

const validate = props => {
  const errors = {};
  const fields = ['name'];

  fields.forEach((f) => {
    if(!(f in props)) {
      errors[f] = `${f} is required`;
    }
  });


  if(props.name && props.name.length < 3) {
    errors.name = "minimum 3 characters";
  }


  return errors;
};


function mapStateToProps(state) {
  return { errorMessage: state.lesson.error };
}
LessonForm.propTypes = {
  handleFormSubmit: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
}

LessonForm = reduxForm({ form: 'LessonForm', validate })(LessonForm);

export default connect(mapStateToProps, actions)(LessonForm);
