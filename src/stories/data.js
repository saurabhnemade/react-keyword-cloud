String.prototype.initCap = function () {
  return this.toLowerCase().replace(/(?:^|\s)[a-z]/g, function (m) {
    return m.toUpperCase();
  });
};

const words = ["pick","he","package","day","necessary","apple","worry","danger","spider","job","quiet","younger","become","citizen","clothes","compound","depth","metal","chapter","bend","main","stick","truth","corn","salt","local","slipped","wool","mysterious","bite","solve","exclaimed","soldier","steep","hay","substance","needed","claws","fifteen","low","needle","suggest","west","situation","political","orbit","organized","add","lovely","against","drop","lonely","movement","either","date","position","vote","spring","cage","coming","tool","duck","twenty","bush","me","business","previous","chart","larger","naturally","greatest","love","swing","environment","particles","introduced","indeed","bad","wrong","up","lucky","jack","rose","information","funny","slightly","manner","in","mother","ear","ready","day","machine","pay","surrounded","tired","boy","real","came","clear"];
const randomFromArray = (myArray) => myArray[Math.floor(Math.random() * myArray.length)];

const generateRandomData = () => {
  const weight = [10, 20, 30, 40, 50, 60, 80];
  let data = [];
  for (var i=0;i<40;i++) {
    data.push({
      text: words[i].initCap(),
      value: randomFromArray(weight)
    });
  }
  return data;
};

export default generateRandomData;
