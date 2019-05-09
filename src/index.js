import React, { Component } from 'react'
import PropTypes from 'prop-types';
import ReactFauxDom from 'react-faux-dom';
import cloud from 'd3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { select } from 'd3-selection';
import cloneDeep from "lodash/cloneDeep";

const fontSize =  word => word.value;

class KeywordCloud extends Component {
  static propTypes = {
    colors: PropTypes.arrayOf(PropTypes.string),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
      })
    ).isRequired,
    font: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    fontSize: PropTypes.func,
    height: PropTypes.number,
    padding: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    rotate: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
    spiral: PropTypes.oneOfType([
      PropTypes.oneOf(["archimedean","rectangular"]),
      PropTypes.func]),
    timeInterval: PropTypes.number,
    width: PropTypes.number,
    onKeyWordClick: PropTypes.func,
    onKeyWordMouseOut: PropTypes.func,
    onKeyWordMouseOver: PropTypes.func
  };

  static defaultProps = {
    width: 800,
    height: 600,
    padding: 0,
    font: 'impact',
    spiral: "archimedean",
    fontSize: fontSize,
    rotate: 0,
    onKeyWordClick: null,
    onKeyWordMouseOver: null,
    onKeyWordMouseOut: null,
    timeInterval: 1000
  };

  componentWillMount = () => {
    this.keywordCloud = ReactFauxDom.createElement('div');
  }

  getColorFiller = () => {
    const fill = scaleOrdinal(this.props.colors || schemeCategory10);
    return fill;
  }

  getFontSize = () => {
    if (this.props.fontSize)
      return this.props.fontSize;
    else
      return word => word.value;
  }

  render() {
    const {
      data,
      width,
      height,
      padding,
      font,
      fontSize,
      rotate,
      spiral,
      onKeyWordClick,
      onKeyWordMouseOver,
      onKeyWordMouseOut,
    } = this.props;

    const clonedData = cloneDeep(data);

    const fillColor = this.getColorFiller();

    select(this.keywordCloud)
      .selectAll('*')
      .remove();

    const layout = cloud()
      .size([width, height])
      .font(font)
      .words(clonedData)
      .timeInterval(1000)
      .padding(padding)
      .rotate(rotate)
      .fontSize(fontSize)
      .spiral(spiral)
      .on('end', words => {
        const texts = select(this.keywordCloud)
          .append('svg')
          .attr('width', layout.size()[0])
          .attr('height', layout.size()[1])
          .append('g')
          .attr(
            'transform',
            `translate(${layout.size()[0] / 2},${layout.size()[1] / 2})`
          )
          .selectAll('text')
          .data(words)
          .enter()
          .append('text')
          .style('font-size', (d,i) => `${d.value}px`)
          .style('font-family', font)
          .style('fill', (d, i) => fillColor(i))
          .attr('text-anchor', 'middle')
          .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
          .text(d => d.text);

        if (onKeyWordClick) {
          texts.on('click', onKeyWordClick);
        }
        if (onKeyWordMouseOver) {
          texts.on('mouseover', onKeyWordMouseOver);
        }
        if (onKeyWordMouseOut) {
          texts.on('mouseout', onKeyWordMouseOut);
        }
      });

    layout.start();

    return this.keywordCloud.toReact();
  }
}

export default KeywordCloud;
