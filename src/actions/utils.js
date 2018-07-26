import _ from 'lodash';


export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function partialArrayMatch(array, test) {
  if (test.length > array.length) {
    return { valid: false, complete: false };
  }

  for (let i = 0; i < test.length; i++) {
    if (!_.isEqual(test[i], array[i])) {
      return { valid: false, complete: false };
    }
  }

  if (test.length < array.length) {
    return { valid: true, complete: false };
  }

  return { valid: true, complete: true };
}
