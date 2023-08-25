import '@wangeditor/editor/dist/css/style.css'; // 引入 css

import { UserServices } from '@/services';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { Button, Row } from 'antd';
import { useEffect, useState } from 'react';

function MyEditor() {
  const defaultList = JSON.parse(sessionStorage.getItem('content'));
  let str = '';
  (defaultList || []).forEach((item: { sender: any; content: any }) => {
    str += `<p><span style="color:rgb(225, 60, 57);">${item.sender}:  </span>${item.content}</p>`;
  });

  // editor 实例
  const [editor, setEditor] = useState<IDomEditor | null>(null); // TS 语法
  // const [editor, setEditor] = useState(null)                   // JS 语法

  // 编辑器内容
  const [html, setHtml] = useState(str);

  // 模拟 ajax 请求，异步设置 html
  useEffect(() => {}, []);

  // 工具栏配置
  const toolbarConfig: Partial<IToolbarConfig> = {}; // TS 语法
  // const toolbarConfig = { }                        // JS 语法

  // 编辑器配置
  const editorConfig: Partial<IEditorConfig> = {
    // TS 语法
    // const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...'
  };

  const insertText = () => {
    if (editor == null) return;
    editor.insertText(' hello ');
  };

  const printHtml = () => {
    if (editor == null) return;
    console.log(editor.getHtml());
  };

  // 及时销毁 editor ，重要！
  useEffect(() => {
    return () => {
      if (editor == null) return;
      editor.destroy();
      setEditor(null);
    };
  }, [editor]);

  const handlePublish = async () => {
    const res = await UserServices.createArticle({
      title: '',
      content: sessionStorage.getItem('content')
    });
    console.log(res, 'res');
  };

  return (
    <>
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={setEditor}
          onChange={editor => setHtml(editor.getHtml())}
          mode="default"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>
      <Row justify="end" style={{ margin: '12px 0 0' }}>
        <Button onClick={handlePublish}>一键发布内容</Button>
      </Row>
      {/* <div style={{ marginTop: '15px' }}>{html}</div> */}
    </>
  );
}

export default MyEditor;
