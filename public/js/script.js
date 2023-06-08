
document.addEventListener("DOMContentLoaded", (event) => {
  let replyButtons = document.querySelectorAll('.reply-button');
  for (let replyButton of replyButtons)
  {
    replyButton.addEventListener('click', function(event) {
      const clickedElement = event.target;
      reply = clickedElement.closest('.comment-item').querySelector('.reply');
      reply.classList.toggle('d-none')
    });
    
  }
  
  let likebuttons = document.querySelectorAll('.like-button');
  for (let like of likebuttons)
  {
    like.addEventListener('click', function(event) {
      const clickedElement = event.target;
      if(clickedElement.classList.contains('like'))
      {
        clickedElement.classList.toggle('like');
        clickedElement.classList.toggle('unlike');
        clickedElement.innerHTML = '<i class="fa-sharp fa-solid fa-heart" style="color: #ed020e;"></i>'
      }
      else if (clickedElement.classList.contains('unlike') )
      {
        clickedElement.classList.toggle('like');
        clickedElement.classList.toggle('unlike');
        clickedElement.innerHTML = '<i class="fa-sharp fa-regular fa-heart"></i>'
      }
      else if ( clickedElement.closest(".like")&& clickedElement.tagName==='I')
      {
        let likeButton = clickedElement.closest(".like")
        likeButton.classList.toggle('like');
        likeButton.classList.toggle('unlike');
        likeButton.innerHTML = '<i class="fa-sharp fa-solid fa-heart" style="color: #ed020e;"></i>'
      }
      else if ( clickedElement.closest(".unlike")&& clickedElement.tagName==='I')
      {
        let likeButton = clickedElement.closest(".unlike")
        likeButton.classList.toggle('like');
        likeButton.classList.toggle('unlike');
        likeButton.innerHTML = '<i class="fa-sharp fa-regular fa-heart"></i>'
      }

    });
    
  } 

});
