import React, { Component } from "react";
import { string } from "prop-types";

class AsyncServerComponent extends Component {
  static propTypes = {
    asyncLoading: string,
  };
  shouldComponentUpdate() {
    return false;
  }
  getExistingHtml(selector) {
    if (typeof document === "undefined") {
      return null;
    }
    const node = document.querySelector(selector);

    return node && node.innerHTML
      ? node.innerHTML
      : `Error: Element with ${selector} not found`;
  }
  render() {
    const selector = this.props.asyncLoading;
    const html = this.getExistingHtml(selector);

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }
}

export default AsyncServerComponent;
