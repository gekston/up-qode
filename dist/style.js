/*
jQuery(document).ready(function ($) {

  $('#checkbox').change(function(){
    setInterval(function () {
        moveRight();
    }, 3000);
  });
  
  var slideCount = $('#slider ul li').length;
  var slideWidth = $('#slider ul li').width();
  var slideHeight = $('#slider ul li').height();
  var sliderUlWidth = slideCount * slideWidth;
  
  $('#slider').css({ width: slideWidth, height: slideHeight });
  
  $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
  
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $('#slider ul').animate({
            left: + slideWidth
        }, 200, function () {
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    function moveRight() {
        $('#slider ul').animate({
            left: - slideWidth
        }, 200, function () {
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css('left', '');
        });
    };

    $('a.control_prev').click(function () {
        moveLeft();
    });

    $('a.control_next').click(function () {
        moveRight();
    });

});
*/

document.addEventListener("DOMContentLoaded", function(){

  let slideCount =  document.querySelectorAll('.slider-list__item').length,
      slideWidth =  document.querySelector('.slider-list__item').offsetWidth,
      slideHeight = document.querySelector('.slider-list__item-img').offsetHeight,
      lastSlider = document.querySelector('.slider-list .slider-list__item:last-child'),
      slideList = document.querySelector('.slider-list'),
      sliderUlWidth = slideCount * slideWidth;

    slideList.style.width = sliderUlWidth + 'px';
    slideList.style.height = slideHeight + 'px';
    slideList.style.marginLeft = - slideWidth + 'px';

    slideList.insertBefore(lastSlider, slideList.children[0]);

    function slideLeft() {
        let start = Date.now();
        let timer = setInterval(function() {
            let timePassed = Date.now() - start;
            slideList.style.left = timePassed - slideWidth + 'px';
            if(slideList.style.left > '0px') {
                slideList.style.left = 0;
            }
            if (timePassed > 2000) clearInterval(timer);
        }, 20);
        let firstSlide =  document.querySelector('.slider-list .slider-list__item:first-child');
        slideList.insertBefore(firstSlide, slideList.children[slideList.length]);
    }

    function slideRight() {
        let start = Date.now();
        let timer = setInterval(function() {
            let timePassed = Date.now() - start;
            slideList.style.left = - timePassed + slideWidth + 'px';
            if(slideList.style.left < '0px') {
                slideList.style.left = 0;
            }
            if (timePassed > 2000) clearInterval(timer);
        }, 20);
        let firstSlide =  document.querySelector('.slider-list .slider-list__item:last-child');
        slideList.insertBefore(firstSlide, slideList.children[0]);
    }
    document.querySelector('.slider-btn__left').addEventListener('click', function(){
        slideLeft();
    });
    document.querySelector('.slider-btn__right').addEventListener('click', function(){
        slideRight();
    });
});