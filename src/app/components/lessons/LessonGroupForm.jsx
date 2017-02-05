import React, {PropTypes} from 'react';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import TextInput from '../common/TextInput';


class LessonGroupForm extends React.Component {
  render() {
    return (
      <div>
        <form>
          <TextInput
            name="name"
            label="name"
            value={this.props.lessonGroup.name}
            onChange={this.props.onChange}
          />
          <DateRangePicker
            id="date_input"
            startDate={this.props.startDate}
            endDate={this.props.endDate}
            focusedInput={this.props.focusedInput}
            onDatesChange={(date) => { this.props.onDateChange(date); }}
            onFocusChange={(focused) => { this.props.onFocusChange(focused); }}
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

LessonGroupForm.propTypes = {
  lessonGroup: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onDateChange: React.PropTypes.func.isRequired,
  onFocusChange: React.PropTypes.func.isRequired,
};

export default LessonGroupForm;
