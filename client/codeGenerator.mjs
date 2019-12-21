const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get('code');
console.log(code);
document.querySelector('#code').textContent = 'Код вашей лекции:\n' + code;