function anchor(){
    document.querySelectorAll('a[href^="#"]:not([href="#"], [href^="#mm"], [id^="tab"])').forEach(anchor => {
        // не трогать ссылки с href="#", mmenu, внутри .nc6-toolbar (режим редактирования), ссылки с id начинающийся с tab
        if(!anchor.closest('.nc6-toolbar')){
            anchor.addEventListener('click', (e) => {
                e.preventDefault();

                const href = anchor.getAttribute('href');
                const targetElement = document.getElementById(href.slice(1));

                if(targetElement){
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    history.pushState(null,null,window.location.pathname + window.location.search + href);
                }
            });
        }
    });
}
export default anchor;