import Swiper from 'swiper';
import { Navigation, Pagination, A11y, Autoplay } from 'swiper/modules';

function slider(){
  document.querySelectorAll('.slider').forEach(slider => {
    const selector = '.' + slider.classList.value.trim().replace(/\s+/g, '.');
    const swiper = new Swiper(selector + ' .swiper', {
      modules: [Pagination, A11y, Autoplay],
      loop: slider.querySelectorAll('.swiper-slide').length > 1,
      autoplay: {
        delay: 7000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false
      },
      pagination: {
        el: selector + ' .swiper-pagination',
        bulletElement: 'button',
        clickable: true,
      },
      navigation: false,
      a11y: {
        prevSlideMessage: 'Предыдущий слайд',
        nextSlideMessage: 'Следующий слайд',
        firstSlideMessage: 'Это первый слайд',
        lastSlideMessage: 'Это последний слайд',
        paginationBulletMessage: 'К слайду №{{index}}'
      },
    });
  });
}

export default slider;