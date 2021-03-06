import React, { Component } from "react";
import PropTypes from 'prop-types';
import invariant from "invariant";
import {
  getNodePath,
  getNodeAtPath,
  updateNodeAtPath,
  mergeNodes
} from "../tree";

export function connectProperty(ComposedComponent) {
  return class PropertyConnector extends Component {
    static contextTypes = {
      yoyo: PropTypes.object
    };

    constructor(props, context) {
      super(props, context);

      this.onChange = this.onChange.bind(this);
      this.id = `yoyo-label-${props.prop}-input`;

      invariant(props.prop, "Prop name should be provided in `prop`");
      invariant(
        context.yoyo,
        "YoYo context should be provided to connect property"
      );
    }

    onChange(event) {
      const newValue = event.target.value;
      const { yoyo } = this.context;
      const { nodeKey, prop, isStyle } = this.props;
      const path = getNodePath(yoyo.tree, nodeKey);
      const node = getNodeAtPath(yoyo.tree, path);
      const propObj = {
        [prop]: newValue
      };
      const props = isStyle ? {
        style: propObj
      } : propObj;
      const updatedNode = mergeNodes(node, {
        props: props
      });

      const newTree = updateNodeAtPath(yoyo.tree, path, updatedNode);

      yoyo.onChange(newTree);
    }

    render() {
      return <ComposedComponent {...this.props} onChange={this.onChange} />;
    }
  };
}
