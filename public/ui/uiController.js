const passcodeDiv = document.getElementById("passcode-div");

const membership = document.getElementById("membership");

membership.addEventListener("change", () => {
  if (membership.value === "true") {
    passcodeDiv.style.visibility = "visible";
  } else {
    passcodeDiv.style.visibility = "hidden";
  }
});
