export default class Search extends React.Component {
  static propTypes = {
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    onChange: React.PropTypes.func,
  }

  constructor(props) {
    super(props);

    this.state = { value: this.props.value };

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { value } = nextProps;
    if (value === this.props.value) return;
    this.setState({ value });
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ value });
  }

  handleKeyPress(e) {
    if (e.key !== 'Enter') return;
    this.props.onChange(this.state.value);
  }

  handleBlur() {
    if (this.state.value === this.props.value) return;
    this.props.onChange(this.state.value);
  }

  renderInput() {
    const props = {
      type: 'text',
      placeholder: this.props.placeholder,
      value: this.state.value == null ? '' : this.state.value,
      onBlur: this.handleBlur,
      onChange: this.handleChange,
      onKeyPress: this.handleKeyPress,
    };
    return <input {...props} />;
  }

  render() {
    return (
      <div>
        {this.renderInput()}
      </div>
    );
  }
}
