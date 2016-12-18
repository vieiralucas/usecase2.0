import React from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/use-case-diagram/Canvas';
import Toolbox from '../components/use-case-diagram/Toolbox';
import * as actions from '../actions';

const UseCaseDiagram = (props) => (
  <div className='tile is-ancestor is-full-height'>
    <Toolbox onClick={props.toolboxSelection} toolbox={props.toolbox} />
    <Canvas onMove={props.onMove} deleteComponent={props.deleteComponent}
      onNameChange={props.onNameChange} umlComponentLink={props.umlComponentLink}
      addComponent={props.addComponent} components={props.components} />
  </div>
);

const mapStateToProps = ({ useCaseDiagram }, ownProps) => ({
  components: useCaseDiagram.components,
  toolbox: useCaseDiagram.toolbox
});

const mapDispatchToProps = dispatch => ({
  onMove: (id, x, y, componentType) => {
    dispatch(actions.umlComponentMove(id, x, y, componentType));
  },
  deleteComponent: (id, componentType) => {
    dispatch(actions.umlComponentDelete(id, componentType));
  },
  onNameChange: (id, name) => {
    dispatch(actions.umlComponentNameChange(id, name));
  },
  umlComponentLink: (id, componentType) => {
    dispatch(actions.umlComponentLink(id, componentType));
  },
  toolboxSelection: type => {
    dispatch(actions.toolboxSelection(type));
  },
  addComponent: (x, y, type) => {
    dispatch(actions.addComponent(x, y, type));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UseCaseDiagram);
