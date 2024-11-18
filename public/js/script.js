//Show Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert)
{
    const time = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]");
    setTimeout(() => {
        showAlert.classList.add("alert-hidden");
    }, time);  // mili giay * 1000 = giay
    closeAlert.addEventListener("click", () => {
        showAlert.classList.add("alert-hidden");
    });
}
//End Alert