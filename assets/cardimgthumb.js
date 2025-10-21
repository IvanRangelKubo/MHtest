function thumbcard(){
 const thumbs = document.querySelectorAll ('.varlink-min')

 thumbs.forEach(thumblink => {
 thumblink.addEventListener('click', function(event) {
   event.preventDefault(); 
   let first_img = thumblink.getAttribute("data-firstimg");
   let second_img = thumblink.getAttribute("data-secondimg");
   let cardproduct = thumblink.parentNode.parentNode;
   let firstdivim =  cardproduct.querySelector(".imgfront");
   let seconddivimg =  cardproduct.querySelector(".imgback");

   cardproduct.querySelectorAll(".productlinkcard").forEach((element) => {
     element.setAttribute("href", thumblink.getAttribute("data-varianturl"));
   });

   firstdivim.style.backgroundImage="url("+first_img+")";
   if (second_img.includes('no-image')) {
     seconddivimg.style.backgroundImage="url("+first_img+")";
   } else {
     seconddivimg.style.backgroundImage="url("+second_img+")";
   }
 });
 });
}


document.addEventListener('DOMContentLoaded', function() {
 thumbcard();
});

const targetDivcollection = document.getElementById("container-grid-product-shop");

const observercollection = new MutationObserver(function(mutationsList, observercollection) {
 thumbcard();
});

const configcollection = { childList: true, characterData: true, subtree: true };

if (targetDivcollection) {
 observercollection.observe(targetDivcollection, configcollection);
}
