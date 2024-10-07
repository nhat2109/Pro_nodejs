module.exports = (objectPagination, query, countProducts) => {
    // laasy params trên url
    if(query.page){
        // nếu k có thì mặc định là 1, nếu kphari thì sẽ lấy ra param hiên url
        objectPagination.currentPage = parseInt(query.page);
    }
    // tính skip để lấy ra các item phù hợp (trang hiện tại - 1) * số giới hạn item trang 2 = (2 - 1) * 4
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    // console.log(objectPagination.skip)
    
    const totalPage = Math.ceil(countProducts/objectPagination.limitItems);
    // console.log(totalPage);
    // tạo object phân trang
    objectPagination.totalPage = totalPage; 

    return objectPagination;
}