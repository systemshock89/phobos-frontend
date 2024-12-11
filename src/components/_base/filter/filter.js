import slideToggle from "../../../js/modules/slideToggle.js";

const filterButtonToggle = () => {
    const filterBtnToggle = document.querySelector('.filter__button-toggle');

    filterBtnToggle?.addEventListener('click', e => {
        e.preventDefault();
        // filterBtnToggle.classList.toggle('header-top__contacts-btn_active');
        document.querySelector('.filter__wrapper').slideToggle(200);
    })
};

export default filterButtonToggle;
