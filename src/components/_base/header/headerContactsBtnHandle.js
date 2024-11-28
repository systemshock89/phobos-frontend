import slideToggle from "../../../js/modules/slideToggle.js";

const headerContactsBtnHandle = () => {
    const headerContactsBtn = document.querySelector('.header-top__contacts-btn');

    headerContactsBtn?.addEventListener('click', e => {
        e.preventDefault();
        headerContactsBtn.classList.toggle('header-top__contacts-btn_active');
        document.querySelector('.header-top__contacts-list').slideToggle(200, null, 'flex');
    })
};

export default headerContactsBtnHandle;
