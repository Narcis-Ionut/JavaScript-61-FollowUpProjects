const smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");
updatBigCup();
smallCups.forEach((cup, ind) => {
  cup.addEventListener("click", () => {
    highlightCups(ind);
  });
});

function highlightCups(ind) {
  if (
    smallCups[ind].classList.contains("full") &&
    !smallCups[ind].nextElementSibling.classList.contains("full")
  ) {
    ind--;
  }
  smallCups.forEach((cup, idx) => {
    if (idx <= ind) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });
  updatBigCup();
}

function updatBigCup() {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerText = `${(fullCups / totalCups) * 100}%`;
  }
  if (fullCups === totalCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    remained.style.visibility = "visible";
    liters.innerText = `${2 - (250 * fullCups) / 1000}L`;
  }
}
