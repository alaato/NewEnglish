let replyButtons = document.querySelectorAll('.reply-button');
for (let replyButton of replyButtons)
{
  replyButton.addEventListener('click', function(event) {
    const clickedElement = event.target;
    reply = clickedElement.closest('.comment-item').querySelector('.reply');
    reply.classList.toggle('d-none')
  });
  
}

