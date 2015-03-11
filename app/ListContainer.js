var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');

function getInitialState(){
  return {
    list: []
  }
}

function handleAddItem(newItem){
  this.setState({
    list: this.state.list.concat([newItem])
  });
}

function handleRemoveItem(index){
  var newList = this.state.list;
  newList.splice(index, 1);
  this.setState({
    list: newList
  });
}

function render(){
  return (
    <div className="col-sm-6 col-md-offset-3">
      <div className="col-sm-12">
        <h3 className="text-center"> Todo List </h3>
        <AddItem add={this.handleAddItem}/>
        <List items={this.state.list} remove={this.handleRemoveItem}/>
      </div>
    </div>
  );
}

var ListContainer = React.createClass({
  getInitialState:  getInitialState,
  handleAddItem:    handleAddItem,
  handleRemoveItem: handleRemoveItem,
  render:           render
});

module.exports = ListContainer;
