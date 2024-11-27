import Cookies from 'js-cookie';

const cookieWarning = () => {
    if (!Cookies.get('cookieWarning')) {
        const cookieWarningDiv = document.createElement('div');
        cookieWarningDiv.className = 'cookie-warning';
        cookieWarningDiv.innerHTML = `
            <div>
                На сайте используются файлы cookies, а также системы Яндекс.Метрика и Google Analytics. Продолжая использовать сайт вы даете согласие на работу с этими данными. 
                <a href="/soglasie/" target="_blank">Подробнее</a>
            </div>
            <button class="button cookie-warning__btn">Хорошо</button>
        `;

        document.body.appendChild(cookieWarningDiv);

        document.querySelector('.cookie-warning__btn').addEventListener('click', (e) => {
            e.preventDefault();
            cookieWarningDiv.style.display = 'none';

            try {
                Cookies.set('cookieWarning', 'true', { expires: 365 });
            } catch (error) {
                console.error('Error setting cookie on cookieWarning:', error);
            }
        });
    }
};

export default cookieWarning;
