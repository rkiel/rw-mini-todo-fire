
var React = require('react');

function getInitialState() {
  return {
    newItem: ''
  };
}

function handleChange(e) {
  this.setState({
    newItem: e.target.value
  })
}

function handleSubmit(e) {
    if(e.keyCode === 13){
      this.props.add(this.state.newItem); // provided by parent
      this.setState({
        newItem: ''
      });
    }
}

function render() {
  return (
    <div>
      <input type="text"
        className="form-control"
        value={this.state.newItem}
        placeholder="New Item"
        onKeyDown={this.handleSubmit}
        onChange={this.handleChange} />
    </div>
  );
}

var AddItem = React.createClass({
  getInitialState: getInitialState,
  handleChange:    handleChange,
  handleSubmit:    handleSubmit,
  render:          render
});

module.exports = AddItem;
