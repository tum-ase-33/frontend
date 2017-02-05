import React, {PropTypes} from 'react';
import TextInput from '../common/TextInput';

class LessonForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <TextInput
            name="name"
            label="name"
            value={this.props.lesson.name}
            onChange={this.props.onChange}
          />

          <input
            type="submit"
            disabled={this.props.saving}
            className="btn btn-primary"
            onClick={this.props.onSave}
          />
        </form>
      </div>
  );
  }
}

LessonForm.propTypes = {
  lesson: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired
};

export default LessonForm;
