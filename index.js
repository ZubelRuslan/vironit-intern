// task-1

// function that reverses a string
function getReversedString(str) {
  if (typeof str === 'string') {
    return str.split('').reverse().join('');
  }
  return;
}

// function that replaces part of the string for substring
function get(str, oldSubStr, newSubStr) {
  if (typeof str === 'string' && typeof oldSubStr === 'string' && typeof newSubStr === 'string') {
    return str.replace(oldSubStr, newSubStr);
  }
  return;
}

// function that returns values of a given object and nested objects in it 
function getValuesOfObject(obj) {
  if (obj !== null && typeof obj === 'object') {
    for (let value in obj) {
      if (typeof obj[value] === 'object') {
        getValuesOfObject(obj[value]);
      } else {
        console.log(obj[value]);
      }
    }
  } else {
    return 'it is not an object';
  }
}