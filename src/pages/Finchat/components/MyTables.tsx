function createTable(data) {  
  // 检查data是否为空
  let tabledata = null
  if (!data || !data.columns || !data.tabledata || data.columns.length === 0 || data.tabledata.length === 0) {  
    return tabledata; // 或者其他你想要的空数据提示  
  }  
  
  // 根据列名列表构造列配置  
  const columns = data.columns.map((columnName) => ({  
    title: columnName.toUpperCase(), // 列标题可以转换为大写  
    dataIndex: columnName, // 列数据在数据项中的字段名  
    key: columnName, // 列的唯一标识  
  }));  
  tabledata = {
    columns: columns,
    data: data.tabledata
  }
  return tabledata
}

export default createTable;