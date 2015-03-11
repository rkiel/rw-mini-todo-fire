var React = require('react');
var AddItem = require('./AddItem');
var List = require('./List');
var Firebase = require('firebase');

function getInitialState(){
  return {
    list: []
  }
}

function handleAddItem(newItem){
  this.firebaseRef.push(newItem);
}

function handleRemoveItem(index){
  var item = this.state.list[index];
  this.firebaseRef.child(item.key).remove();
}

// child_added is triggered once for each existing child and
// then again every time a new child is added to the specified path.
// The event callback is passed a snapshot containing the new child's data.
function childAddedListener(snapshot) {
  console.log('child_added ' + snapshot.val());
  this.setState({
    list: this.state.list.concat([{key: snapshot.key(), val: snapshot.val()}])
  });
}

function childRemovedListener(snapshot) {
  console.log('child_removed ' + snapshot.key());
  var key = snapshot.key();
  var newList = this.state.list.filter(function(item){
    return item.key !== key;
  });
  this.setState({
    list: newList
  });
}

function componentDidMount(){
  this.firebaseRef = new Firebase("https://rkiel-mini-todo.firebaseio.com/todos");
  this.firebaseRef.on('child_added',   this.childAddedListener); // don't need bind()
  this.firebaseRef.on('child_removed', this.childRemovedListener); // don't need bind()
}

function render(){
  return (
    <div className="col-sm-6 col-md-offset-3">
      <div className="col-sm-12">
        <h3 className="text-center"> Todo List </h3>
        <AddItem add={this.handleAddItem}/>
        <List items={this.state.list.map(function(item){return item.val})} remove={this.handleRemoveItem}/>
      </div>
    </div>
  );
}

var ListContainer = React.createClass({
  getInitialState:      getInitialState,
  handleAddItem:        handleAddItem,
  handleRemoveItem:     handleRemoveItem,
  componentDidMount:    componentDidMount,
  childAddedListener:   childAddedListener,
  childRemovedListener: childRemovedListener,
  render:               render
});

module.exports = ListContainer;
