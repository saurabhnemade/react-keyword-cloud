import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ReactResizeDetector from 'react-resize-detector';
import debounce from "lodash/debounce";
import isString from "lodash/isString";

const isPercent = value => (
  isString(value) && value.indexOf('%') === value.length - 1
);

class ResponsiveContainer extends Component {
  static propTypes = {
    aspect: PropTypes.number,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    children: PropTypes.node.isRequired,
    debounce: PropTypes.number,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  };

  static defaultProps = {
    width: '100%',
    height: '100%',
    debounce: 0
  };

  constructor(props) {
    super(props);

    this.state = {
      containerWidth: -1,
      containerHeight: -1,
      lastUpdated: Date.now()
    };

    this.handleResize = props.debounce > 0 ?
      debounce(this.updateDimensionsImmediate, props.debounce) :
      this.updateDimensionsImmediate;
  }

  /* eslint-disable  react/no-did-mount-set-state */
  componentDidMount() {
    this.mounted = true;

    const size = this.getContainerSize();

    if (size) {
      this.setState({containerWidth: size.containerWidth, containerHeight: size.containerHeight, lastUpdated: Date.now()});
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  getContainerSize() {
    if (!this.container) { return null; }

    return {
      containerWidth: this.container.clientWidth,
      containerHeight: this.container.clientHeight,
    };
  }

  updateDimensionsImmediate = () => {
    if (!this.mounted) { return; }

    const newSize = this.getContainerSize();
    if (newSize) {
      const { containerWidth: oldWidth, containerHeight: oldHeight, lastUpdated } = this.state;
      const { containerWidth, containerHeight } = newSize;

      if ((containerWidth !== oldWidth || containerHeight !== oldHeight) && (lastUpdated + 1000) < Date.now()) {
        this.setState({ containerWidth, containerHeight, lastUpdated: Date.now() });
      }
    }
  };

  renderChart() {
    const { containerWidth, containerHeight } = this.state;

    if (containerWidth < 0 || containerHeight < 0) { return null; }

    const { aspect, width, height, maxHeight, children } = this.props;

    let calculatedWidth = isPercent(width) ? containerWidth : width;
    let calculatedHeight = isPercent(height) ? containerHeight : height;

    if (aspect && aspect > 0) {
      // Preserve the desired aspect ratio
      if (calculatedWidth) {
        // Will default to using width for aspect ratio
        calculatedHeight = calculatedWidth / aspect;
      } else if (calculatedHeight) {
        // But we should also take height into consideration
        calculatedWidth = calculatedHeight * aspect;
      }

      // if maxHeight is set, overwrite if calculatedHeight is greater than maxHeight
      if (maxHeight && (calculatedHeight > maxHeight)) {
        calculatedHeight = maxHeight;
      }
    }

    return React.cloneElement(children, {
      width: calculatedWidth,
      height: calculatedHeight,
    });

  }

  render() {
    const { minWidth, minHeight, width, height, maxHeight, id, className } = this.props;
    const style = { width, height, minWidth, minHeight, maxHeight };

    return (
      <Fragment>
        <div
          id={id}
          style={style}
          ref={(node) => { this.container = node; }}
        >
          {this.renderChart()}
        </div>
        <ReactResizeDetector handleWidth handleHeight onResize={this.handleResize} />
      </Fragment>
    );
  }
}

export default ResponsiveContainer;
