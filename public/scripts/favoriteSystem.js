


const addToFavorite = (e)=>{
  const id= e.target.closest("article").querySelector("input").value; 
  const span = e.target.closest("span");

  axios
  .patch("/api/timeline/fav/" + id) 
  .then((apiResult)=>{
      if(apiResult.data.favorite){
    span.innerHTML = `<i class="fas fa-star"></i>`
      } else {
          span.innerHTML = `<i class="far fa-star"></i>`
      }
  
  })
  .catch((err)=>{console.log(err)})


}

const etoiles = document.querySelectorAll(".favorite"); 
etoiles.forEach((etoile)=>{
    etoile.onclick = addToFavorite; 
})

/*
   1.trouver le dom element 
   2. if (favorite){
       display etoile pleine
       position change
       update the doc
   } else {
       display etoile vide 
       position change aussi
       update the doc
   }

   */