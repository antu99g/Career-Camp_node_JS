const pStatus = document.getElementsByClassName("pStatus");

// Setting different colors to placed and not-placed students
(function() {
  for(let stat of pStatus){
      if (stat.innerText == "Placed") {

        if (stat.classList.contains("not-placed")) {
          stat.classList.replace("not-placed", "placed");
        } else {
          stat.classList.add("placed");
        }
        
      } else {

        if (stat.classList.contains("placed")) {
          stat.classList.replace("placed", "not-placed");
        } else {
          stat.classList.add("not-placed");
        }
		  
      }
  }
})();