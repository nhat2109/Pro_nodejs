// change Status
// lấy ra các button
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonChangeStatus.length > 0){ // kiểm tra 
    // lấy ra form thay đổi status
    const formChangeStatus = document.querySelector("#form-change-status");
    // lấy ra đường dẫn cho form thay đổi status
    const path = formChangeStatus.getAttribute("data-path");
    // duyệt qua tất cả các button thay đổi status và thêm sự kiện click vào mỗi button
    buttonChangeStatus.forEach(button =>{
        // thêm sự kiện click vào button thay đổi status
        button.addEventListener("click", () => {
            // lấy ra status hiện tại của button và id của sản phẩm
            const statusCurrent = button.getAttribute("data-status");
            const id = button.getAttribute("data-id");
            // tạo biến mới status mới
            let statusChange = statusCurrent === "active" ? "inactive" : "active";
            console.log(statusChange);
            console.log(statusCurrent);
            console.log(id);
            // tạo đường dẫn cho form thay đổi status mới
            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            console.log(action);
            // // Thay đổi đường dẫn cho form thay đổi status
            formChangeStatus.action = action;
            // // Submit form thay đổi status
            formChangeStatus.submit();

            // // Reset status button
            // button.setAttribute("data-status", statusChange);
            // const statusButton = statusChange === "active"? "Inactive" : "Active";
            // button.textContent = statusButton;

            // // Reset status table row
            // const row = button.closest("tr");
            // row.classList.toggle("active");
        });

    });
        
}
// End change status