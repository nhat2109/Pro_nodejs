//permissions
const tablePermissions = document.querySelector("[table-permissions]");
if (tablePermissions)
{
    // lấy tất cả các input checkboxes
    const buttonSubmit = document.querySelector("[button-submit]");
    // bắt sự kiện cho button submit
    buttonSubmit.addEventListener("click", () => {
        // tạo mảng chứa quyền truy cập cho từng sản phẩm
        let permissions = [];
        // lấy tất cả các rows của table permissions
        const rows = tablePermissions.querySelectorAll("[data-name]");
        // duyệt từng row để lấy tên và trạng thái của từng quyền truy cập
        rows.forEach(row => {
            // lấy tên của từng quyền truy cập và trạng thái của từng quyền truy cập trong row đó
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            // nếu tên quyền truy cập là id, duyệt từng input để lấy id và add vào mảng permissions
            if(name == "id"){
                // lấy tất cả các input trong row đó
                inputs.forEach(input => {
                    // lấy id của sản phẩm trong input đó và add vào mảng permissions
                    const id = input.value;
                    // tạo object mới với id và mảng quyền truy cập cho sản phẩm đó
                    permissions.push({
                        id: id,
                        permission: []
                    });
                })
                // nếu tên quyền truy cập không phải id, duyệt từng input để lấy value và add vào mảng permissions
            }else{
                inputs.forEach((input, index) => {
                    // lấy value của input đó và kiểm tra xem nó đã được check hay chưa
                    const checked = input.checked;
                    // nếu input đã được check, add vào mảng quyền truy cập cho sản phẩm đó
                    if(checked) {
                        permissions[index].permission.push(name);
                    }
                });
            }
        })
        // console.log(permissions);
        // nếu mảng permissions không rỗng, submit form change permissions
        if(permissions.length > 0) {
            // tạo form change permissions
            const formChangePermissions = document.querySelector('#form-change-permissions');
            const inputPermissions = formChangePermissions.querySelector('input[name="permissions"]');
            inputPermissions.value = JSON.stringify(permissions);
            // console.log(inputPermissions);
            formChangePermissions.submit();
        }
    });
}
//End permissions

// Permissions data defaults
const dataRecords = document.querySelector("[data-records]");
if(dataRecords)
{
    // lấy dữ liệu records từ data-records attribute của table permissions
    const records = JSON.parse(dataRecords.getAttribute("data-records"));
    // duyệt từng record và từng quyền truy cập để lấy tên và trạng thái của từng quyền truy cập
    const tablePermissions = document.querySelector("[table-permissions]");
    records.forEach((record, index) => {
        const permissions = record.permissions;
        permissions.forEach((permission) => {
            const row = tablePermissions.querySelector(`[data-name="${permission}"]`);
            const input = row.querySelectorAll("input")[index];
            input.checked = true;
        });
    })
}
// End Permissions Data Defaults