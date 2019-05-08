import randomWords from "random-words";

String.prototype.initCap = function () {
  return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
    return m.toUpperCase();
  });
};

const randomFromArray = (myArray) => myArray[Math.floor(Math.random() * myArray.length)];

const generateRandomData = () => {
  const weight = [10, 20, 30, 40, 50, 60, 80];
  const words = randomWords(100);
  let data = [];
  for (var i=0;i<40;i++) {
    data.push({
      text: words[i].initCap(),
      value: randomFromArray(weight)
    });
  }
  return data;
}

export default generateRandomData;
