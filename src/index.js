import React from 'react';

class BrowserDetection extends React.Component {

  constructor(props) {
    super(props);

    const isOpera = (!!window.opr && !!opr.addons) || !!window.opera
                    || navigator.userAgent.indexOf(' OPR/') >= 0;
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    const isEdge = !(isIE) && !!window.StyleMedia;
    const isChrome = !!window.chrome && !!window.chrome.webstore;
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
  children: React.PropTypes.object.isRequired,
  once: React.PropTypes.bool,
};

export default BrowserDetection;
