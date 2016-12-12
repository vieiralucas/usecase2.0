// @flow

import React, { Component } from 'react';
import Actor from './uml/Actor';
import UseCase from './uml/UseCase';

type WheelEvent = {
  deltaY: number
};

const canvasStyle = {
  background: 'cornsilk'
};

class Canvas extends Component {
  state: {
    scale: number;
  };

  constructor() {
    super();

    this.state = {
      scale: 1
    };
  };

  handleZoom({ deltaY }: WheelEvent) {
    const newScale = this.state.scale + deltaY * 0.1;
    this.setState({
      scale: newScale >= 1 ? newScale : 1
    });
  }

  renderComponents(scale: number) {
    const { components } = this.props;
    const componentsJsx = components.map(component => {
      switch(component.type) {
      case 'actor':
        return this.renderActor(component, scale);
      case 'use-case':
        return this.renderUseCase(component, scale);
      default:
        throw new Error(`Unknown uml component: ${component.type}`);
      }
    });

    return componentsJsx;
  }

  renderActor(actor: any, scale: number) {
    const { id, name, x, y } = actor;
    return <Actor key={ id } id={ id } name={ name } x={ x } y={ y } onMove={ this.props.onComponentMove } scale={ scale } />
  }

  renderUseCase(useCase: any, scale: number) {
    const { id, name, x, y } = useCase;
    return <UseCase key={id} id={id} name={name} x={x} y={y} onMove={this.props.onComponentMove} scale={scale} />
  }

  render() {
    const { scale } = this.state;
    const { height } = this.props;

    return (
      <svg width={ '100%' } height={ height } onWheel={ this.handleZoom.bind(this) } style={ canvasStyle }>
        { this.renderComponents(scale) }
      </svg>
    );
  }
}

export default Canvas;
