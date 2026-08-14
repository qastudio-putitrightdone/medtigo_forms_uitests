// @ts-check

const FIRST_NAMES = ['John', 'Jane', 'Alex', 'Emily', 'Chris', 'Taylor', 'Jordan', 'Morgan'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Wilson', 'Moore'];

// Must match the <option value="..."> list on the Profession dropdown.
const PROFESSIONS = ['APRN', 'CRNA', 'DO', 'MBBS', 'MD', 'PA', 'RN'];

/** @param {string[]} items */
function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

/** @param {number} length */
function randomDigits(length) {
  let digits = '';
  for (let i = 0; i < length; i++) {
    digits += Math.floor(Math.random() * 10);
  }
  return digits;
}

function randomFullName() {
  return `${randomItem(FIRST_NAMES)} ${randomItem(LAST_NAMES)}`;
}

/** 10 digits, matching the field's pattern="[0-9]{10}". */
function randomPhoneNumber() {
  const firstDigit = Math.floor(Math.random() * 8) + 2; // avoid leading 0/1
  return `${firstDigit}${randomDigits(9)}`;
}

/** qaarchitect+<random>@putitrightdone.com so every submission is uniquely tagged. */
function randomEmail() {
  const randomText = Math.random().toString(36).slice(2, 10);
  return `qaarchitect+${randomText}@putitrightdone.com`;
}

function randomProfession() {
  return randomItem(PROFESSIONS);
}

export { randomFullName, randomPhoneNumber, randomEmail, randomProfession };
