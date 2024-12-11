import { Fancybox } from "@fancyapps/ui";
import phoneInput from "./phone-input.js";
import { showLoader , hideLoader } from "../../js/modules/loader.js";
import loadScript from "../../js/modules/loadScript.js";

const setupFancyboxForm = () => {
    try {
        Fancybox.bind("[data-fancybox]:where(.button, .button2, .button3, .button4)", {
            dragToClose: !window.isMobile, // bug: click to button misses on mobile
            on: {
                reveal: (fancybox, slide) => {
                    const formID = slide.el.querySelector('form')?.id;
                    if (formID) initSubmitForm(formID);
                }
            }
        });
    } catch (error) {
        console.error('Fancybox form initialization error:', error);
    }
};

// Инициализация отправки формы
const initSubmitForm = (formID ) => {
    const form = document.forms[formID];
    if (!form) return;

    const formButton = form.querySelector('.form__button');
    const formFieldPersonal = form.querySelector('.form__field_personal');
    const formFieldPersonalCheckbox = formFieldPersonal?.querySelector('.checkbox__input');

    gRecaptchaInit(form);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!validateForm(form, formFieldPersonal, formFieldPersonalCheckbox)) return;

        formButton.disabled = true;
        showLoader();

        try {

            const textSend = formButton.dataset.text_send || "Ваша заявка отправлена!";
            const typeSend = formButton.dataset.type_send;
            const yam = form.querySelector(".id_target_ym")?.value || formButton.dataset.yam;
            // const openInPopap = formButton.dataset.open_in_popap;

            const formData = new FormData(form);

            if (typeSend === "ajax") {

                const response = await fetch(`/form_fmc/api/add.php?ext_key=${form.dataset.extKey}`, {
                    method: 'POST',
                    cache: 'no-cache',
                    body: JSON.stringify({
                        send_ajax: 1,
                        data: Array.from(formData.entries()).map(([name, value]) => ({ name, value }))
                    }),
                    headers: { 'Content-Type': 'application/json' }
                });

                if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`);
                const result = await response.text();
                handleFormResponse(result, yam, textSend, form, formButton /*openInPopap*/);
            }

            if (typeSend === "reboot") {
                clearFormData(form);
                goYaM(yam);
                fancyboxSuccessMessage(textSend);
                setTimeout(() => form.submit(), 1000);
            }
        } catch (error) {
            console.error('Form submission error:', error);
        }
    });

    initializeFormFields(form, formFieldPersonalCheckbox);
};

window.initSubmitForm = initSubmitForm;

// Обработка ответа от сервера после отправки формы
const handleFormResponse = (response, yam, textSend, form, formButton /*openInPopap*/) => {
    hideLoader();

    if (response > 0) {
        if (yam === 'ZAKAZ1CLICK') ecommerceProduct(response);
        clearFormData(form);
        closeFormPopup(yam, textSend, form, formButton /*openInPopap*/);
    } else {
        if (response === 'long') {
            alert('Вы слишком быстро вводите данные формы! Сработала защита от спама. Попробуйте еще раз.');
        } else if (response === 'recaptcha') {
            alert('Сработала recaptcha!');
        } else if (response === '0') {
            alert('Сработала защита от взлома!');
        }
        formButton.disabled = false;
        form.reset();
    }
};

// Валидация формы
const validateForm = (form, formFieldPersonal, formFieldPersonalCheckbox) => {
    let isValid = true;

    if (formFieldPersonal && !formFieldPersonalCheckbox?.checked) {
        formFieldPersonal.classList.add("form__field_error");
        isValid = false;
    } else {
        formFieldPersonal?.classList.remove("form__field_error");
    }

    form.querySelectorAll('.valid_req').forEach(field => {
        if (!field.value || field.value === '0') {
            field.closest('.form__field')?.classList.add('form__field_error');
            isValid = false;
        }
    });

    form.querySelectorAll('.valid_mail').forEach(field => {
        if (field.value && !isValidEmailAddress(field.value)) {
            field.closest('.form__field')?.classList.add('form__field_error');
            isValid = false;
        }
    });

    form.querySelectorAll('.valid_phone').forEach(field => {
        if (field.value && !isValidTel(field.value)) {
            field.closest('.form__field')?.classList.add('form__field_error');
            isValid = false;
        }
    });

    return isValid;
};

// Проверка валидности email
const isValidEmailAddress = (email) => /^[\S]+@[a-z0-9-]+\.[a-z]{2,}$/i.test(email);

// Проверка валидности телефона
const isValidTel = (tel) => /^(\+7|8)\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}|\+\d+$/i.test(tel);

// Настройка полей формы
const initializeFormFields = (form, formFieldPersonalCheckbox) => {
    phoneInput('input[type=tel]');

    form.querySelectorAll(".form-control, .checkbox__input, .radio__input").forEach(control => {
        control.addEventListener("focus", () => {
            control.closest('.form__field_error')?.classList.remove("form__field_error");
        });
    });

    form.querySelectorAll(".form__field").forEach(field => {
        field.addEventListener("click", () => {
            field.classList.remove("form__field_error");
        });
    });

    formFieldPersonalCheckbox?.addEventListener("click", () => {
        if (formFieldPersonalCheckbox.checked) {
            formFieldPersonalCheckbox.closest('.form__field_personal')?.classList.remove("form__field_error");
        }
    });

    const formSpSec = form.querySelector('.form_sp_sec');
    if (formSpSec) formSpSec.value = 'f2d2g54j5y2f5';

    const timeElement = form.querySelector('.form_fmc_nf_time');
    if (timeElement?.dataset.emb === '1') timeElement.value = Math.floor(Date.now() / 1000);
    
    const pageFromElement = form.querySelector('.form_fmc_page_from');
    if (pageFromElement?.dataset.emb === '1') pageFromElement.value = window.location.href;

    setupFormHandlers(form);
    loadFormData(form);
};

// Закрытие попапа и сброс формы
const closeFormPopup = (yam, textSend, form, formButton /*openInPopap*/) => {
    goYaM(yam);
    fancyboxSuccessMessage(textSend);

    form.querySelectorAll(".form__field_error").forEach(field => field.classList.remove("form__field_error"));
    form.reset();

    setTimeout(() => {
        Fancybox.close();
        formButton.disabled = false;
    }, 1000);
};

// Показ сообщения об успешной отправке
const fancyboxSuccessMessage = (textSend) => {
    hideLoader();

    new Fancybox(
        [{
            src: `<div class="modal modal_success">
                    <div class="form__title">Спасибо!</div>
                    <div class="modal__text">${textSend}</div>
                    <button class="button form__button" data-fancybox-close>Ok</button>
                </div>`,
            type: "html"
        }],
        { autoFocus: false }
    );
};

// Отправка события в Яндекс.Метрику и Google Tag Manager
const goYaM = (id) => {
    if (window.ym && id) {
        ym(window.yaC, 'reachGoal', id);
    }

    if (window.dataLayer) {
        dataLayer.push({ 'event': id || 'formsend' });
    }
};

// Ecommerce - Обработка покупки для формы "заказ в 1 клик"
const ecommerceProduct = (response) => {
    window.dataLayer = window.dataLayer || [];

    const productItem = document.querySelector('.modal_order');
    if (!productItem) return;

    const fancyboxSrcParams = new URLSearchParams(Fancybox.getInstance().userSlides[0].src);
    const productID = fancyboxSrcParams.get('ext_var[tovarid]');
    const productName = productItem.querySelector('.form__field_name div')?.textContent.trim() || '';
    const priceElement = productItem.querySelector('.form__field_price .nowrap');

    const productPrice = priceElement ? parseInt(priceElement.textContent.replace(/\D/g, ''), 10) : 0;
    console.log(Fancybox.getInstance())
    const productCategory = document.querySelector(`.product-category[data-product-id="${productID}"]`).value;

    dataLayer.push({
        "ecommerce": {
            "currencyCode": "RUB",
            "purchase": {
                "actionField": {
                    "id": response
                },
                "products": [
                    {
                        "id": productID,
                        "name": productName,
                        "price": productPrice,
                        "category": productCategory,
                        //"brand": "",
                        //"variant": ""
                        "quantity": 1
                    },
                ]
            }
        }
    });
};

// Сохранение данных формы в localStorage
const saveFormData = (form) => {
    const formData = {};
    Array.from(form.elements).forEach(element => {
        if (element.name) {
            if (element.type === 'checkbox') {
                if (!formData[element.name]) {
                    formData[element.name] = [];
                }
                if (element.checked) {
                    formData[element.name].push(element.value);
                }
            } else if (element.type === 'radio') {
                if (element.checked) {
                    formData[element.name] = element.value;
                }
            } else if (element.type !== 'hidden') {
                formData[element.name] = element.value;
            }
        }
    });

    localStorage.setItem(form.id, JSON.stringify(formData));
};

// Очищение сохраненные данные формы из localStorage
const clearFormData = (form) => {
    localStorage.removeItem(form.id);
};

// Загрузка данных формы из localStorage и установка значения полей формы
const loadFormData = (form) => {
    const formData = JSON.parse(localStorage.getItem(form.id));
    if (!formData) return;

    Array.from(form.elements).forEach(element => {
        if (element.name && formData[element.name]) {
            if (element.type === 'checkbox') {
                element.checked = formData[element.name].includes(element.value);
            } else if (element.type === 'radio') {
                element.checked = formData[element.name] === element.value;
            } else {
                element.value = formData[element.name];
            }
        }
    });
};

// Устанавливает обработчики событий для полей формы, чтобы автоматически сохранять данные в localStorage при изменении значений
const setupFormHandlers = (form) => {
    Array.from(form.elements).forEach(element => {
        if (['text', 'tel', 'email', 'number', 'textarea'].includes(element.type) || element.tagName === 'SELECT') {
            element.addEventListener('input', () => saveFormData(form));
        }

        // blur - for bug with unsave one number phoneInput mask
        if (['tel'].includes(element.type)) {
            element.addEventListener('blur', () => saveFormData(form));
        }

        if (['checkbox', 'radio'].includes(element.type)) {
            element.addEventListener('change', () => saveFormData(form));
        }
    });
};

// Google Recaptcha
let isRecaptchaScriptLoaded = false;
const gRecaptchaInit = (form) => {
    const recaptchaResponseInput = form.querySelector('.recaptchaResponse');
    if (!recaptchaResponseInput) return;

    const googleRecaptchaOpenKey = recaptchaResponseInput.dataset.gok;

    // Проверяем, был ли скрипт уже загружен
    if (!isRecaptchaScriptLoaded) {
        loadScript(`https://www.google.com/recaptcha/api.js?render=${googleRecaptchaOpenKey}`)
            .then(() => {
                isRecaptchaScriptLoaded = true; // Устанавливаем флаг после успешной загрузки
                return getRecaptchaToken(googleRecaptchaOpenKey);
            })
            .then(token => {
                recaptchaResponseInput.value = token;
            })
            .catch(error => {
                console.error('Ошибка загрузки скрипта Google Recaptcha:', error);
            });
    } else {
        // Если скрипт уже загружен, просто получаем токен
        getRecaptchaToken(googleRecaptchaOpenKey)
            .then(token => {
                recaptchaResponseInput.value = token;
            })
            .catch(error => {
                console.error('Ошибка получения токена reCAPTCHA:', error);
            });
    }

}

// получение токена Google Recaptcha
const getRecaptchaToken = (googleRecaptchaOpenKey) => {
    return new Promise((resolve, reject) => {
        if (typeof grecaptcha === 'undefined') {
            reject(new Error('reCAPTCHA library not loaded'));
            return;
        }

        grecaptcha.ready(() => {
            grecaptcha.execute(googleRecaptchaOpenKey, { action: 'feedback' })
                .then(token => resolve(token))
                .catch(error => reject(error));
        });
    });
};

document.addEventListener("DOMContentLoaded", setupFancyboxForm);

export default initSubmitForm;