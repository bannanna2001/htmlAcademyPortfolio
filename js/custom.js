"use strict"

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1)

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

let formWriteToMe = document.querySelector('.write-form');
let formBtn = formWriteToMe.querySelector('.more');
let message = formWriteToMe.querySelector('.message');
let messageTooltip = document.querySelector('.message + .tooltip');

let minMessageLength = 20;
let maxMessageLength = 149;

message.addEventListener('input', (event) => {
    if (event.target.value.length < minMessageLength || event.target.value.length > maxMessageLength) {
        formBtn.disabled = true;
        message.classList.add('not-valid-text');
        if (event.target.value.length < minMessageLength) {
            messageTooltip.classList.remove('hidden');
            messageTooltip.textContent = "Минимум 20 символов";
        } else {
            messageTooltip.classList.remove('hidden');
            messageTooltip.textContent = "Максимум 149 символов";
        }
    } else {
        messageTooltip.classList.add('hidden');
        formBtn.disabled = false;
        message.classList.remove('not-valid-text');
    }
})

formWriteToMe.addEventListener('submit', (event) => {
    event.preventDefault()

    let name = formWriteToMe.querySelector('#name');
    let nameTooltip = formWriteToMe.querySelector('#name + .tooltip');

    let email = formWriteToMe.querySelector('#email');
    let emailtooltip = formWriteToMe.querySelector('#email + .tooltip');

    let nameValue = name.value.trim();
    let regexp = /^[a-za-я]{3,25}$/i; //  Имя состоит только из букв русского или латинского алфавита - длиной от 3 до 25 символов

    if (regexp.test(name.value)) {
        name.classList.remove('not-valid-text');
        nameTooltip.classList.add('hidden');
    } else {
        if (nameValue.length < 3) {
            nameTooltip.classList.remove('hidden');
            nameTooltip.textContent = "Имя не короче 3-х символов";
        } else if (nameValue.length > 25) {
            nameTooltip.classList.remove('hidden');
            nameTooltip.textContent = "Имя не длиннее 25-ти символов";
        }

        name.classList.add('not-valid-text');
        return;
    }

    let emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
    let emailValue = email.value.trim();

    if (emailRegexp.test(email.value)) {
        email.classList.remove('not-valid-text');
        emailtooltip.classList.add('hidden');
    } else {
        emailtooltip.classList.remove('hidden');
        emailtooltip.textContent = "Неверный формат почты";
        email.classList.add('not-valid-text');
        return;
    }

    if (message.value.length === 0) {
        messageTooltip.classList.remove('hidden');
        message.classList.add('not-valid-text');
        messageTooltip.textContent = "Введите текст сообщения";
        return;
    }

    name.value = "";
    email.value = "";
    message.value = "";
});

let articles = document.querySelectorAll('.article');
let tags = [];

for (let item of articles) {
    for (let tag of item.dataset.tags.split(' ')) {
        if (!tags.includes(tag))
            tags.push(tag);
    }
}

let selecter = document.querySelector('.articles-header-select');
for (let tagText of tags) {
    let tag = document.createElement('option');
    tag.textContent = tagText[0].toUpperCase() + tagText.slice(1);
    selecter.append(tag);
}

selecter.addEventListener('change', (event) => {
    let selectTag = event.target.value[0].toLowerCase() + event.target.value.slice(1);

    if (selectTag === "выбрать тему") {
        for (let item of articles) {
            item.classList.remove('hidden');
        }
    } else {
        for (let item of articles) {
            let articleTags = item.dataset.tags.split(' ');
            if (!articleTags.includes(selectTag))
                item.classList.add('hidden');
            else
                item.classList.remove('hidden');
        }
    }
});