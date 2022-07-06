const searchInput = document.querySelector("input");
const list = document.querySelector(".list");
const error = document.querySelector(".output");
const clearBtn = document.querySelector("#clear");
searchInput.addEventListener("input", checkValue);

// checkValue entered in the imput
function checkValue(e) {
  // input value
  let acronym = e.target.value.toLowerCase();
  // clearing previous results
  error.innerHTML = "";
  list.innerHTML = "";
  //
  if (e.target.value.length > 0) {
    showAcronyms(
      orgs.filter((org) => {
        return org.acr.toLowerCase().includes(acronym);
      })
    );
  }
}
// showAcronyms creates and appends li elements for each result
function showAcronyms(results) {
  list.innerHTML = "";
  if (results.length === 0) {
    error.innerHTML = "No matches for this search";
  } else {
    for (const org of results) {
      // creating a li element for each result item
      const listItem = document.createElement("li");
      let myAcr = org.acr;
      // adding a class to each item of the results
      listItem.classList.add("list-item");
      // setting the id = to acronym
      listItem.setAttribute("id", myAcr);
      // enabling keyboard navigation
      listItem.setAttribute("tabindex", 0);
      // adding event listeners that will display name in output
      listItem.addEventListener("keydown", onEnter);
      listItem.addEventListener("click", onClick);
      // adding acronym to list item
      const text = document.createTextNode(org.acr);
      // appending the text
      listItem.appendChild(text);
      // appending the result item to the list
      list.appendChild(listItem);
    }
  }
}

function showName(result) {
  orgs.forEach(function (arrayItem) {
    const acr = arrayItem.acr;
    if (result == acr) {
      const selected = document.createElement("span");
      const text = document.createTextNode(arrayItem.name);
      selected.appendChild(text);
      const listItem = document.getElementById(result);
      listItem.appendChild(selected);
      // error.innerHTML = arrayItem.name;
      searchInput.value = arrayItem.acr;
    }
  });
}

const onClick = (event) => {
  showName(event.target.id);
};

const onEnter = (event) => {
  if (event.code === "Enter") {
    showName(event.target.id);
  }
};

clearBtn.addEventListener("click", () => {
  error.innerHTML = "";
  list.innerHTML = "";
});
