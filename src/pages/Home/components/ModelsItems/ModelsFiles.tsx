import React, { useState } from 'react';
import { Upload, message, UploadFile } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { uploadFileService } from '@/pages/Home/service';
const { Dragger } = Upload;

const FileUploadDownloadPage = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const customRequest = async (options: any) => {
    // 构造你需要的请求参数
    const formData = new FormData();
    formData.append('file', options.file);
    // console.log(formData.get('file'));
    try {
      const response = await uploadFileService(options.file)
      if (response.ret_code == 0) {
        // 处理成功响应
        options.onSuccess(response, options.file);
      } else {
        // 处理失败响应
        options.onError(new Error('上传失败'), null);
      }
    } catch (error) {
      // 处理请求错误
      options.onError(error, null);
    }
  };

  const handleUpload = (info: { fileList: any; }) => {
    let fileList = [...info.fileList];

    // 1. 限制上传文件的数量，只显示最新上传的两个文件
    fileList = fileList.slice(-2);

    // 2. 从响应中读取并显示文件链接
    fileList = fileList.map(file => {
      if (file.response) {
        file.url = file.response.data.url;
        file.status = 'done';
      } else {
        file.status = 'error';
      }
      return file;
    });

    setFileList(fileList); // 更新 fileList 状态
  };

  return (
    <div>
      <h2>文件上传和下载界面</h2>
      <Dragger
        name="file"
        // action={null} // 设置 action 为 null
        customRequest={customRequest}
        onChange={handleUpload}
        fileList={fileList}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖动文件到此区域进行上传</p>
        <p className="ant-upload-hint">
          支持单个或批量上传。严禁上传公司数据或其他恶意文件。
        </p>
      </Dragger>

      <div>
        <h3>已上传文件：</h3>
        <ul>
          {fileList.map(file => (
            <li key={file.uid}>
              <a href={file.url} target="_blank" rel="noopener noreferrer">
                {file.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUploadDownloadPage;
