import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';


const refs = {
  form: document.querySelector(".form"),
  btn: document.querySelector("button"),
  delay: document.querySelector("input[name=delay]"),
  step: document.querySelector("input[name=step]"),
  amount: document.querySelector("input[name=amount]"),
}

refs.form.addEventListener("submit", evt => {
  evt.preventDefault();
  const givenDelay = Number(refs.delay.value);
  const givenStep = Number(refs.step.value);
  let delay = givenDelay;

  for (let i = 1; i <= refs.amount.value; i++){
    createPromise(i, delay);
    delay += givenStep; 
  }
})

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
      
    }, delay);
  }).then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  }).catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  })
}
