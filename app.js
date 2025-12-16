// select-item
const items = document.querySelectorAll('.select-item');

items.forEach(item => {
    item.addEventListener('click', () => {

        items.forEach(i => i.classList.remove('active'));

        item.classList.add('active');
    });
});

// letter button
document.querySelector('.letter-btn').addEventListener('click', () => {
    document.querySelector('.letter').style.display = 'none';
});



// countdown for HOT sale to end
const secs = document.querySelector('#s-time');
const minutes = document.querySelector('#m-time');
const hours = document.querySelector('#h-time');
const days = document.querySelector('#d-time');

const targetDate = new Date("January 1, 2026 00:00:00").getTime();

setInterval(() => {
  const now = Date.now();
  const diff = targetDate - now;

  if (diff <= 0) {
    secs.textContent = 0;
    minutes.textContent = 0;
    hours.textContent = 0;
    days.textContent = 0;
    return;
  }

  const s = Math.floor(diff / 1000) % 60;
  const m = Math.floor(diff / (1000 * 60)) % 60;
  const h = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));

  secs.textContent = s;
  minutes.textContent = m;
  hours.textContent = h;
  days.textContent = d;

}, 1000);