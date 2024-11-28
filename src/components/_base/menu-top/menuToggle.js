import slideToggle from "../../../js/modules/slideToggle.js";

function menuToggle(){
    document.querySelectorAll('.menu-top .submenu-toggle, .menu-header .submenu-toggle').forEach(submenuToggle => {
        submenuToggle.addEventListener('click', (event) => {
            event.preventDefault(); // При клике на ссылку никуда не переходим
        });

        submenuToggle.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                const nextElement = event.target.nextElementSibling;
                if (nextElement) {
                    nextElement.slideToggle(200); // при нажатии на enter разворачиваем подразделы
                }
            }
        });
    });
}

export default menuToggle;