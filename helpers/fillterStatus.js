module.exports = (query) =>{
    let fillterStatus = [
        {
            name: 'Tất cả',
            status: "",
            class: ""
        },
        {
            name: 'Hoạt động',
            status: "active",
            class: ""
        },
        {
            name: 'Dừng hoạt động',
            status: "inactive",
            class: ""
        }
    ]
    // them class .active khi click
    // kiểm tra status đc gửi lên
    if(query.status)
    {
        const index = fillterStatus.findIndex(item => item.status === query.status);
        fillterStatus[index].class = "active";
    }else {
        const index = fillterStatus.findIndex(item => item.status == "" );
        fillterStatus[index].class = "active";
    }
    return fillterStatus;
}