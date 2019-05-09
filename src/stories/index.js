import React from 'react';

import { storiesOf,addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs, text, boolean, number, object } from '@storybook/addon-knobs';
import KeywordCloud from "./../index";
import generateRandomData from "./data";

addDecorator(withInfo);
addDecorator(withKnobs);

storiesOf("Keyword Cloud", module)
  .add("Default minimum", () => (
    <KeywordCloud data={generateRandomData()}/>
  ))
  .add("Custom Width", () => (
    <KeywordCloud
      width={900}
      data={generateRandomData()}/>
  ))
  .add("Custom Height", () => {
    const height = number("height", 300);
    const data = object("data", [...generateRandomData()]);
    return (
      <KeywordCloud
        height={height}
        data={data}/>
    );
  })
  .add("Custom Width and Height", () => (
    <KeywordCloud
      width={900}
      height={300}
      data={generateRandomData()}/>
  ))
  .add("Spiral - archimedean", () => (
    <KeywordCloud
      spiral={"archimedean"}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Spiral - rectangular", () => (
    <KeywordCloud
      spiral={"rectangular"}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Spiral - Custom function", () => (
    <KeywordCloud
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Padding", () => (
    <KeywordCloud
      padding={10}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Font", () => (
    <KeywordCloud
      font={"sans-serif"}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("FontSize", () => (
    <KeywordCloud
      fontSize={node => node.value*2}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Colors", () => (
    <KeywordCloud
      colors={["red", "green", "blue"]}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate everything to 270", () => (
    <KeywordCloud
      rotate={270}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate everything to 30", () => (
    <KeywordCloud
      rotate={30}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate everything to 60", () => (
    <KeywordCloud
      rotate={60}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate everything to 90", () => (
    <KeywordCloud
      rotate={90}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate everything to 120", () => (
    <KeywordCloud
      rotate={120}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate everything to 180", () => (
    <KeywordCloud
      rotate={180}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate everything to 230", () => (
    <KeywordCloud
      rotate={230}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate everything to 290", () => (
    <KeywordCloud
      rotate={290}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate conditional", () => (
    <KeywordCloud
      rotate={d => {
        const positions = [0,30,60,90,120,150,180,210,240,270,300]
        return positions[Math.floor(Math.random() * positions.length)];
      }}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate 0,270", () => (
    <KeywordCloud
      rotate={d => {
        const positions = [0,270]
        return positions[Math.floor(Math.random() * positions.length)];
      }}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate 0,90", () => (
    <KeywordCloud
      rotate={d => {
        const positions = [0,90]
        return positions[Math.floor(Math.random() * positions.length)];
      }}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate 0,90,270", () => (
    <KeywordCloud
      rotate={d => {
        const positions = [0,90,270]
        return positions[Math.floor(Math.random() * positions.length)];
      }}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate 0,90,270,360", () => (
    <KeywordCloud
      rotate={d => {
        const positions = [0,90,270,360]
        return positions[Math.floor(Math.random() * positions.length)];
      }}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ))
  .add("Rotate 0,270 - fontSize", () => (
    <KeywordCloud
      rotate={d => {
        const positions = [0,270]
        return positions[Math.floor(Math.random() * positions.length)];
      }}
      fontSize={d => {
        if(d.value > 50) {
          return d.value*10;
        }
        return d.value;
      }}
      width={900}
      height={600}
      data={generateRandomData()}/>
  ));
