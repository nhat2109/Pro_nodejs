//Button Status lấy ra button-status bên pug
const buttonsStatus = document.querySelectorAll("[button-status]");
// kiểm tra nếu như nó k rỗng 
if(buttonsStatus.length > 0) {
    // lấy ra url trên trình duyệt với ob URL có chi tiết các hàm bên trong như href để lấy ra url
    let url = new URL(window.location.href);
    // duyệt vòng lặp để lấy ra các button 
    buttonsStatus.forEach(button => {
        // đăng ký sự kiện click vào button
        button.addEventListener("click", () => {
            // tạo biến status được lấy giá trị bên trong button-status
            const status = button.getAttribute("button-status");
            // nếu cos status 
            if(status){
                // thêm status vào url
                url.searchParams.set("status", status);
            }else{
                // nếu không có status thì xóa status khoir url
                url.searchParams.delete("status");
            }
            // điều hướng trang web đến url mới đã thay ddooir 
            window.location.href = url.href;
        });
    });
}

// lấy ra formsearch 
const formSearch = document.querySelector('#form-search');
// kiểm tra 
if(formSearch) {
    // khởi tạo url 
    let url = new URL(window.location.href);
    // đăng ký sự kiện submit form với arrow function
    formSearch.addEventListener('submit', (e) =>{
        e.preventDefault(); // ngăn chặn mặc định khi submit form 
        const keyword = e.target.elements.keyword.value; // lấy dữ liệu từ ô nhập 
        
        if(keyword)
        {
            url.searchParams.set('keyword', keyword);
        }else{
            url.searchParams.delete('keyword');
        }
        window.location.href = url.href;
    });
}
// End form search 

// pagination
 const buttonPagination = document.querySelectorAll('[button-pagination]');
 if(buttonPagination)
 {
    let url = new URL(window.location.href);
     buttonPagination.forEach(button => {
         button.addEventListener('click', () => {
             const page = button.getAttribute('button-pagination');
             url.searchParams.set('page', page);
             window.location.href = url.href;
         });
     });
 }
//Pagination end

//Check box multi: là cả cái table đó để gọi tới các trường trong table đó 
const checkboxMulti = document.querySelector("[checkbox-multi]")
if(checkboxMulti)
{
    // lấy input check all ảo ở phần checkbox multi
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
    // lấy tất cả các input id ảo ở phần checkbox multi ảo ở phần checkbox multi
    const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

    
    inputCheckAll.addEventListener("click", () =>{
        if(inputCheckAll.checked)
        {
            inputsId.forEach(input => {
                input.checked = true;
            })
        }else
        {
            inputsId.forEach(input => {
                input.checked = false;
            })
        }
    });
    // lấy chiều dài id của checkboxinput để nếu mà bằng nhau thì nó sẽ tự check lên 
    inputsId.forEach(input =>{
        input.addEventListener("click", () => {
           const countChecked = checkboxMulti.querySelectorAll(
            "input[name='id']:checked"
           ).length;
        //    console.log(countChecked); lấy ra từng chiều dài ô input
        //    console.log(inputsId.length); lấy ra chiều dài của số input hiện có
        if(countChecked  == inputsId.length) {
            inputCheckAll.checked = true;
        }else
        {
            inputCheckAll.checked = false;
        }
    });
        
    })
}
// End check box multi

// Form change multi gửi những id được check sang cho bên back xử lí
const formChangeMulti = document.querySelector('[form-change-multi]');
if(formChangeMulti)
{
    formChangeMulti.addEventListener('submit', (e) => { 
        e.preventDefault();
        //Check box multi: là cả cái table đó để gọi tới các trường trong table đó 
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        // lấy ra tất cả nhưng input đc checkbox
        const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");
        // console.log(inputsChecked);

        const typeChange = e.target.elements.type.value;
        if(typeChange === "delete-all"){
            const isConfirm = confirm("Bạn có muốn xóa tất cả không?");
            if(!isConfirm)
            {
                return;
            }
        }

        if(inputsChecked.length > 0)
        {
            // tạo ra mảng để add vào 
            let ids = [];
            // lấy ids ở form gửi 
            const inputIds = formChangeMulti.querySelector("input[name='ids']");
            // duyệt qua mảng ids và add vào input ids
            inputsChecked.forEach(input =>{
                const id = input.value;
                if(typeChange === "change-position")
                {
                    const position = input.closest("tr")
                    .querySelector("input[name='position']").value;
                    ids.push(`${id}-${position}`);
                }else
                {
                    ids.push(id);
                }
            });
            // chuyển mảng ids thành chuỗi và add vào input ids ở form gửi ảo ở phần checkbox multi ảo ở phần checkbox multi
            inputIds.value = ids.join(", ");
            formChangeMulti.submit();
        }else{
            alert("Vui lòng chọn ít nhất một mục để thực hiện thao tác này!");
        }
    });
}
// End orm change multi


// Delete Item product
const buttonDelete = document.querySelectorAll("[button-delete]");
 if(buttonDelete.length > 0) {
    const formDeleteItem = document.querySelector("#form-change-delete");
    const path = formDeleteItem.getAttribute("data-path");
    buttonDelete.forEach(button => {
        button.addEventListener("click", () => {   
            // console.log(button.getAttribute("data-id"));
            const isConfirm = confirm("Bạn có chắc muốn xóa sản phẩm này không?");
            if(isConfirm) {
                const id = button.getAttribute("data-id");
                // console.log(id);
                // console.log(path);
                const action = `${path}/${id}?_method=DELETE`; // khi gửi url lên thì phải có pthuc xóa đằng sau
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
         });
    });
 }
// End Delete Item
const buttonDeleteItem = document.querySelectorAll("[button-delete-account]");
if(buttonDeleteItem.length > 0){
    const formDeleteItemAccount = document.querySelector("#form-account-delete");
    const path = formDeleteItemAccount.getAttribute("data-path");
    buttonDeleteItem.forEach(button => {
        button.addEventListener("click", () =>{
            const isConfirm = confirm("Bạn có chắc muốn xóa tài khoản này không?");
            if(isConfirm) {
                const id = button.getAttribute("data-id");
                // console.log(id);
                // console.log(path);
                const action = `${path}/${id}?_method=DELETE`; // khi gửi url lên thì phải có pthuc xóa đằng sau
                formDeleteItemAccount.action = action;
                formDeleteItemAccount.submit();
            }
        });
    });
}
// Delete Item account
// Restore Item
const buttonRestore = document.querySelectorAll("[button-restore]");
 if(buttonRestore.length > 0) {
    const formDeleteItem = document.querySelector("#form-change-restore");
    const path = formDeleteItem.getAttribute("data-path");
    buttonRestore.forEach(button => {
        button.addEventListener("click", () => {   
            // console.log(button.getAttribute("data-id"));
            const isConfirm = confirm("Bạn có chắc muốn khôi phục sản phẩm này không");
            if(isConfirm) {
                const id = button.getAttribute("data-id");
                // console.log(id);
                // console.log(path);
                const action = `${path}/${id}?_method=PATCH`; // khi gửi url lên thì phải có pthuc xóa đằng sau
                formDeleteItem.action = action;
                formDeleteItem.submit();
            }
         });
    });
 }
// End Restore Item

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

//Upload Image
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]");
    const uploadImagePreview = document.querySelector("[upload-image-preview]");
    uploadImageInput.addEventListener("change", (e) => {
        console.log(e);
        const file = e.target.files[0];
        if(file)
        {
            uploadImagePreview.src = URL.createObjectURL(file);
        }
    })
}
//End Upload Image

//sort 
const sort = document.querySelector("[sort]");
if(sort)
{
    let url = new URL(window.location.href);

    const sortSelect = sort.querySelector("[sort-select]");
    const sortClear = sort.querySelector("[sort-clear]");
    sortSelect.addEventListener("change", (e) =>{
        // console.log(e);
        const value = e.target.value;
        const [sortKey, sortValue] = value.split("-");

        // console.log(sortKey);
        // console.log(sortValue);

        url.searchParams.set("sortKey", sortKey);
        url.searchParams.set("sortValue", sortValue);
        window.location.href = url.href;
    });
    //Clear sapw xep
    sortClear.addEventListener("click", () => {
        url.searchParams.delete("sortKey");
        url.searchParams.delete("sortValue");
        window.location.href = url.href;
    });

    //Theem selected cho option để nó hiển thị khi chọn và không bị load lại trang
    const sortKey = url.searchParams.get("sortKey");
    const sortValue = url.searchParams.get("sortValue");
    if(sortKey && sortValue)
    {
        const stringSort = `${sortKey}-${sortValue}`;
        // console.log(stringSort);
        const optionSelected = sortSelect.querySelector(`option[value="${stringSort}"]`);
        optionSelected.selected = true;
    }
}
// end sort



