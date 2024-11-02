let count = 0;
// arr được lấy từ bản ghi records 
const createTree = (arr, parentId = "") => {
    const tree = [];
    // duyệt từng item trong mảng records
    arr.forEach((item) => {
        // kiểm tra xem id của item hiện tại có phải là id của parent_id của item đang duyệt hay không
        if(String(item.parent_id) === String(parentId))
        {
            // tăng số item đã tạo ra
            count++;
            // tạo item mới với dữ liệu từ bản ghi records
            const newItem = item;
            // thêm index vào item mới để đánh số thứ tự của item trong cây
            newItem.index = count++;
            // gọi hàm createTree với mảng records và id của item hiện tại để tạo cây con
            const children = createTree(arr , item.id);
            // nếu có cây con thì thêm vào mảng tree
            if(children.length > 0)
            {
                // thêm cây con vào item mới
                newItem.children = children;
            }
            // thêm item mới vào mảng tree
            tree.push(newItem);
        }
    });
    // trả về mảng tree
    return tree;
}

module.exports.tree = (arr, parentId = "") => {
    count = 0; // đếm số item đã tạo ra
    const tree = createTree(arr, parentId = "");
    return tree;
}