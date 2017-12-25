import * as React from 'react';
import * as NProgress from 'nprogress';

interface IProps {
    isLoading: boolean;
}

export default class Loading extends React.PureComponent<IProps, {}> {
  componentDidMount() {
    if (this.props.isLoading) {
      NProgress.start();
    }
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }

  componentWillUnmount() {
    NProgress.remove();
  }

  render() {
    return null;
  }
}