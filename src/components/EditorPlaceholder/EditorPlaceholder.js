import React, { Component } from "react";
import styled from 'styled-components';
import theme from "themes/index";
import StyleConstants from "constants/StyleConstants";

const EditorPlaceholderWrapper = styled.div`
  transition: top 100ms ease, left 100ms ease, width 100ms ease;
  animation: ${StyleConstants.PULSE_ANIMATION_NAME} 1s infinite;
  position: absolute;
  pointer-events: none;
  text-align: center;
  user-select: none;
`;

const EditorPlaceholderHr = styled.hr`
  display: block;
  background-color: ${theme.colors.primary};
  width: 100%;
  border: none;
  padding: 0;
  margin: 0;
  line-height: 0;
  height: ${theme.border.width}px;
  &::before, &::after {
    content: '';
    border: ${theme.border.arrowSize}px solid rgba(66, 129, 244, 0);
    position: absolute;
    margin-top: ${-1 * theme.border.arrowSize}px;
    top: 50%;
    content: "";
    height: 0;
    width: 0;
  }
  &::before {
    border-right-color: ${theme.colors.primary};
    right: -10px;
  }
  &::after {
    border-left-color: ${theme.colors.primary};
    left: -10px;
  }
`;

class EditorPlaceholder extends Component {
  render() {
    const positionAndSize = {
      left: this.props.x,
      top: this.props.y,
      width: this.props.width
    };

    return (
      <EditorPlaceholderWrapper style={positionAndSize}>
        <EditorPlaceholderHr />
      </EditorPlaceholderWrapper>
    );
  }
}

export default EditorPlaceholder;
