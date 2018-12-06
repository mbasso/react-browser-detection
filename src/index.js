import React from 'react';
import { bool, object } from 'prop-types';

export default class BrowserDetection extends React.Component {
  static defaultProps = {
    once: true,
  };
  
  static propTypes = {
    children: object.isRequired,
    once: bool,
  };

  constructor(...params) {
    super(...params);

    const isAndroid = navigator.userAgent.toLowerCase().indexOf('android') !== -1;
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    const isEdge = !(isIE) && !!window.StyleMedia;
    const isFirefox = typeof InstallTrigger !== 'undefined';
    const isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera
                    || navigator.userAgent.indexOf(' OPR/') >= 0;
    const isChrome = !!window.chrome &&
                    (navigator.userAgent.toLowerCase().indexOf('google inc.') || isAndroid) &&
                    navigator.userAgent.toLowerCase().indexOf('googlebot') === -1;
    const isSafari = !isChrome && navigator.userAgent.toLowerCase().indexOf('safari') !== -1;
    const isBlink = (isChrome || isOpera) && !!window.CSS;
    const isGoogleBot = navigator.userAgent.toLowerCase().indexOf('googlebot') !== -1;
    let browser;

    if (isIE) {
      browser = 'ie';
    } else if (isEdge) {
      browser = 'edge';
    } else if (isFirefox) {
      browser = 'firefox';
    } else if (isOpera) {
      browser = 'opera';
    } else if (isChrome) {
      browser = 'chrome';
    } else if (isSafari) {
      browser = 'safari';
    } else if (isBlink) {
      browser = 'blink';
    } else if (isGoogleBot) {
      browser = 'googlebot';
    } else {
      browser = 'unknown';
    }

    this.state = {
      browser,
      isAndroid
    };
    this.state.children = this.renderChildren();
  }

  renderChildren = () => {
    const { children } = this.props;
    const { browser, isAndroid } = this.state;
    const render = (isAndroid ? (children[`android-${browser}`] || children.android) : null)
      || children[browser] || children.default || (() => null);
    return render(browser);
  }

  render() {
    return this.props.once
            ? this.state.children
            : this.renderChildren();
  }
}
