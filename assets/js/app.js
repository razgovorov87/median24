$(document).ready(function() {
  $('.popup-image').magnificPopup({type:'image'});
});

const burger = document.querySelector('.burger');
const menuTop = burger.querySelector('.menu-top');
const menuMiddle = burger.querySelector('.menu-middle');
const menuBottom = burger.querySelector('.menu-bottom');

const header = document.querySelector('header.header');

burger.addEventListener('click', () => {
  header.classList.toggle('open')
  menuTop.classList.toggle('click');
  menuMiddle.classList.toggle('click');
  menuBottom.classList.toggle('click');
});