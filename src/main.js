import './style.css';

const HZ = 240;
const HZ_MS = 1000 / HZ;
const ONE_SEC_MS = 1000;
const USE_HEARTZ = true;
const USE_TEST = false;
const TEST_OFFSET = 10000;

const intlOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: true,
  hourCycle: 'h11',
};

const container = document.querySelector('#current');
const hourPointer = document.querySelector('#hour');
const minutePointer = document.querySelector('#minute');
const secondPointer = document.querySelector('#second');

const hourNumerals = document.querySelectorAll('.hh');
const minuteNumerals = document.querySelectorAll('.mm');
const secondNumerals = document.querySelectorAll('.ss');

const interval = () => (USE_HEARTZ ? HZ_MS : ONE_SEC_MS);
const calcRadians = (date) => {
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();
  const ms = date.getMilliseconds();

  return {
    hour: 30 * hour + 0.5 * (minute + second / 60 + ms / 60000),
    minute: 6 * (minute + second / 60 + ms / 60000),
    second: 6 * (second + ms / 1000),
  };
};

let currentTime;
let test = 0;

USE_TEST && setInterval(() => (test += TEST_OFFSET));

const tick = () => {
  currentTime = USE_TEST ? new Date(test * 1000) : new Date();
  const text = currentTime.toLocaleString('pt-BR', intlOptions);
  const { hour, minute, second } = calcRadians(currentTime);

  hourPointer.style.transform = `rotate(${hour}deg)`;
  minutePointer.style.transform = `rotate(${minute}deg)`;
  secondPointer.style.transform = `rotate(${second}deg)`;

  hourNumerals.forEach((h) => {
    h.style.transform = `rotate(${-hour}deg)`;
    h.textContent = currentTime.getHours();
  });
  minuteNumerals.forEach((m) => {
    m.style.transform = `rotate(${-minute}deg)`;
    m.textContent = currentTime.getMinutes();
  });
  secondNumerals.forEach((s) => {
    s.style.transform = `rotate(${-second}deg)`;
    s.textContent = currentTime.getSeconds();
  });

  container.textContent = text;
};

setInterval(() => tick(), interval());
