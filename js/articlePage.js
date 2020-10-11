'use strict'

let likeBtn = document.querySelector('.likes figure svg');
let likeCount = document.querySelector('.likes span');

likeBtn.addEventListener('click', (event) => {
    let n = +likeCount.textContent;
    let svgPath = likeBtn.querySelector('path');

    if (!likeBtn.classList.contains('likes-active')) {
        likeCount.textContent = ++n;
        svgPath.setAttribute('style', 'fill: red');
        likeBtn.classList.add('likes-active');
    } else {
        likeCount.textContent = --n;
        likeBtn.classList.remove('likes-active');
        svgPath.setAttribute('style', 'fill: #000');
    }
});

let commentForm = document.querySelector('.comment-form');
let userName = document.querySelector('#name');
let userEmail = document.querySelector('#email');
let commentText = document.querySelector('#message');
let commentTextTooltip = document.querySelector('#message + .tooltip');

let comments = document.querySelector('.comments');
commentForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (userName.value.length > 0 && commentText.value.length > 20) {
        let newComment = document.createElement('article');
        newComment.classList.add('comment');
        newComment.innerHTML = `<div class="comment-info"><figure><img src="../img/user-profile.svg" alt=""></figure><h5 class="commet-author">${userName.value}</h5></div><div class="comment-text">${commentText.value}</div>`;
        comments.appendChild(newComment);

        commentTextTooltip.classList.add('hidden');
        commentText.classList.remove('not-valid-text');
        userName.value = '';
        userEmail.value = '';
        commentText.value = '';
    } else {
        if (commentText.value.length < 20) {
            commentTextTooltip.classList.remove('hidden');
            commentText.classList.add('not-valid-text');
            commentTextTooltip.textContent = "Введите текст сообщения (мин. 20 букв)";
            return;
        }
    }
});

let minMessageLength = 20;
let maxMessageLength = 149;
let formBtn = commentForm.querySelector('.more');

commentText.addEventListener('input', (event) => {
    if (event.target.value.length < minMessageLength || event.target.value.length > maxMessageLength) {
        formBtn.disabled = true;
        commentText.classList.add('not-valid-text');
        if (event.target.value.length < minMessageLength) {
            commentTextTooltip.classList.remove('hidden');
            commentTextTooltip.textContent = "Минимум 20 символов";
        } else {
            commentTextTooltip.classList.remove('hidden');
            commentTextTooltip.textContent = "Максимум 149 символов";
        }
    } else {
        commentTextTooltip.classList.add('hidden');
        formBtn.disabled = false;
        commentText.classList.remove('not-valid-text');
    }
})