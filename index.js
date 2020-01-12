const silder = document.getElementById("silder");
const number = document.getElementById("number");
const form = document.getElementById("form");
const upperCase = document.getElementById("checkbox-1");
const inculdeNumber = document.getElementById("checkbox-2");
const inculdeSymbol = document.getElementById("checkbox-3");
const display = document.getElementById("display-password");
const copy = document.getElementById("copy");
const selection = window.getSelection();
const range = document.createRange();
const answer = document.getElementById("copyResult");

// function to target the silder and the number input
const getCharaAmount = event => {
  const value = event.target.value;
  silder.value = value;
  number.value = value;
};

silder.addEventListener("input", getCharaAmount);
number.addEventListener("input", getCharaAmount);

const array = (low, high) => {
  const arr = [];
  for (let i = low; i <= high; i++) {
    arr.push(i);
  }
  return arr;
};

const upperCode = array(65, 90);
const lowerCode = array(97, 122);
const numberCode = array(48, 57);
const symbol1 = array(33, 47);
const symbol2 = array(58, 64);
const symbol3 = array(91, 96);
const symbol4 = array(123, 126);
const symbolCode = [...symbol1, ...symbol2, ...symbol3, ...symbol4];
console.log(symbolCode);

function generatePass(amountOfCharac, nums, symbols, upper) {
  let charCode = lowerCode;
  if (upper) charCode = [...charCode, ...upperCode];

  if (nums) charCode = [...charCode, ...numberCode];

  if (symbols) charCode = [...charCode, ...symbolCode];

  const passwordArr = [];
  for (let x = 0; x < amountOfCharac; x++) {
    const char = charCode[Math.floor(Math.random() * charCode.length)];
    passwordArr.push(String.fromCharCode(char));
  }
  return passwordArr.join("");
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const upper = upperCase.checked;
  const nums = inculdeNumber.checked;
  const symbols = inculdeSymbol.checked;
  const amountOfCharac = number.value;
  const password = generatePass(amountOfCharac, nums, symbols, upper);
  display.innerText = password;
  console.log(password);
});

// function to copy the generated password
copy.addEventListener("click", e => {
  e.preventDefault();
  range.selectNodeContents(display);
  selection.removeAllRanges();
  selection.addRange(range);
  let message = "Copied";
  const successful = document.execCommand("copy");
  if (successful) {
    answer.innerHTML = message;
    setTimeout(function() {
      answer.innerHTML = "";
    }, 1000);
  } else {
    answer.innerHTML = "Unable to copy!";
  }
  window.getSelection().removeAllRanges();
});
