'use strict';
import 'bootstrap/dist/js/bootstrap';
import 'owl.carousel/dist/owl.carousel';

import './select';

$(function () {
  // CLOSE ON TOUCH BODY
  $(document).click(function (e) {
    e.stopPropagation();
    let container = $(".container-select-language");
    if (container.has(e.target).length === 0) {
      $('.drop-down-language').slideUp();
    }
  });

  $(document.body).on('click', '.drop-down-key', function () {
    $(this).next().slideToggle();
  });

  $(document.body).on('click', '.drop-down-language li', function () {
    $(this).parents('.drop-down-language').prev().find('p').text($(this).text().trim());
    $(this).parents('.drop-down-language').slideToggle();
    let selectedDataId = $(this).data('id');
  });


  $('.select-selected').each(function () {
    $(this).next().find('div').first().replaceWith(function () {
      return $('<p/>', {
        html: this.innerHTML
      });
    });
  })

  $('.buttonUp').click(function () {
    // $('body').scrollTop($('body'));
    $('body').animate({
      scrollTop: 0
    }, '500');
    console.log('g');
  })


  $(window).scroll(function () {
    if ($(document).scrollTop() > 700) {
      $('.buttonUp').addClass('active');
    } else {
      $('.buttonUp').removeClass('active');
    }
  });


  $('#toggleMenu').on('click' , function(){
    $(this).toggleClass('active');
    $('.mobile-menu').toggleClass('active');
    $('body').toggleClass('overflow-hidden')
  })


  $('.langSelectContainer').click(function () {
    $('.selectLanguage').slideDown();
  });

  $('.closeIconLang').click(function () {
    $('.selectLanguage').slideUp();
  });


  // OWL CAROUSEL
  $('.tb_third_section .owl-carousel , .tb_second_section .owl-carousel').owlCarousel({
    items:2,
    dots:true,
    center:true,
    loop:true
  });

  $('.tb_fourth_section .owl-carousel').owlCarousel({
    dots:true,
    margin:10,


    responsive: {
      0: {
        items: 1,
        margin: 10,
      },

      400: {
        items: 2
      }
    }
  });
});