import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  submitBtn: document.querySelector('button[type="submit"]')
}

let promiseData = {};

refs.submitBtn.addEventListener('click', promiseSubmit);

refs.form.addEventListener('input', evt => {

  promiseData[evt.target.name] = evt.target.value;

});

function promiseSubmit(e) {
  e.preventDefault();

  let getDelay = Number(promiseData.delay);
  let stepToNumber = Number(promiseData.step);
  let amountToNumber = Number(promiseData.amount);

  for (let position = 1; position <= amountToNumber; position += 1){
    
    if (position > 1) {
      getDelay += stepToNumber;     
    }

      createPromise(position, getDelay)
    .then(item => Notify.success(`✅ Fulfilled promise ${item.position} in ${item.delay}ms`))
    .catch(item => Notify.failure(`❌ Rejected promise ${item.position} in ${item.delay}ms`));

  }
}


function createPromise(position, delay) {

  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {

    setTimeout(() => {

        if (shouldResolve) {
        // Fulfill
        resolve({position, delay});
        } else {
        // Reject
        reject({position, delay});
        }
    }, delay);

  });
}
