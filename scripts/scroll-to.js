//not Working
window.onscroll = function() {
  console.log("Vertical: " + window.scrollY);
  console.log("Horizontal: " + window.scrollX);

}
window.onscroll = () =>{
  if(window.scrollY<=695 && screen.width>=1201){
    let headerLg = document.getElementById("navbarLg");
    headerLg.classList.add('show');
  }else{
    let headerLg = document.getElementById("navbarLg");
    headerLg.classList.remove("show");
  }
};

