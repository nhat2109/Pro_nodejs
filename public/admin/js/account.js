// // Change status
// const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
// if(buttonChangeStatus.length > 0){
//     const formChangeStatus = document.querySelector("#form-change-status");
//     const path = formChangeStatus.getAttribute("data-path");
//     buttonChangeStatus.forEach(button => {
//         button.addEventListener("click", () =>{
//             const statusCurrent = button.getAttribute("data-status");
//             const id = button.getAttribute("data-id");

//             let statusChange = statusCurrent == "active" ? "inactive" : "active";
//             // console.log(statusCurrent);
//             // console.log(id);
//             // console.log(statusChange);
//             const action = path + `/${statusChange}/${id}?_method=PATCH`;
//             formChangeStatus.action = action;
//             // console.log(action);
//             formChangeStatus.submit();
//         });
//     });
// }

const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0) {
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");
    buttonChangeStatus.forEach(button => {
        button.addEventListener("click", () => {
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");

            let changeStatus = statusCurrent == "active" ? "inactive" : "active";

            const action = path + `/${changeStatus}/${id}?_method=PATCH`;
            formChangeStatus.action = action;
            formChangeStatus.submit();
        });
    });
}