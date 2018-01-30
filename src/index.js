import React from 'react';
import { bool, object } from 'prop-types';

class BrowserDetection extends React.Component {

  constructor(props) {
    super(props);

    const isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera
                    || navigator.userAgent.indexOf(' OPR/') >= 0;
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const isChrome = !!window.chrome && !!window.chrome.webstore;
    const isSafari = !isChrome && navigator.userAgent.toLowerCase().indexOf('safari') !== -1;
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    const isEdge = !(isIE) && !!window.StyleMedia;
    const isBlink = (isChrome || isOpera) && !!window.CSS;
    let browser;

    if (isOpera) {
      browser = 'opera';
    } else if (isFirefox) {
      browser = 'firefox';
    } else if (isSafari) {
      browser = 'safari';
    } else if (isIE) {
      browser = 'ie';
    } else if (isEdge) {
      browser = 'edge';
    } else if (isChrome) {
      browser = 'chrome';
    } else if (isBlink) {
      browser = 'blink';
    } else {
      browser = 'unknown';
    }

    this.state = {
      browser,
      children: <div></div>,
    };
  }

  componentDidMount() {
    this.setState(::this.getConfigs());
  }

  getConfigs() {
    const { children } = this.props;
    const { browser } = this.state;
    const func = children[browser] || children.default;
    return {
      browser,
      children: func(browser),
    };
  }

  render() {
    return this.props.once ? this.state.children : (() => {
      return ::this.getConfigs().children;
    })();
  }
}

BrowserDetection.defaultProps = {
  once: true,
};

BrowserDetection.propTypes = {
  children: object.isRequired,
  once: bool,
};

export default BrowserDetection;
