  /* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function sort() {
    document.getElementById("mysort").classList.toggle("showsort");
  }
  
  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.sortbtn')) {
      var sortdropdowns = document.getElementsByClassName("sort-content");
      var j;
      for (j = 0; j < sortdropdowns.length; j++) {
        var sortopenDropdown = sortdropdowns[j];
        if (sortopenDropdown.classList.contains('showsort')) {
         sortopenDropdown.classList.remove('showsort');
        }
      }
    }
  }