// import { PageContainer, ProCard } from '@ant-design/pro-components';
// import { SetStateAction, useState, useEffect } from 'react';
// import { Button, Dropdown } from 'antd';
// import ModelsCode from '@/pages/Home/components/Public/ModelsCode';
// import ModelsFiles from '@/pages/Home/components/Public/ModelsFiles';
// import ModelsFigure from '@/pages/Home/components/Public/ModelsFigure';

// interface Tab {
//   tab: string;
//   key: string;
//   closable: boolean;
// }
// const ModelsItems: React.FC<{
//   modelValue: string
//   factorValue: string
//   showModal: boolean //是否展示Modal详情界面
//   company: string; //公司
//   setModelValue: React.Dispatch<React.SetStateAction<string>>;
//   setFactorValue: React.Dispatch<React.SetStateAction<string>>;
//   setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
//   setCompany: (company: string) => void;
//   isDeveloper: boolean //是否开发者模式
// }> = ({ modelValue, factorValue, setModelValue,
//   setFactorValue, showModal, setShowModal, company, setCompany, isDeveloper }) => {

//     const [currentTab, setCurrentTab] = useState('Code');
//     const onTabChange = (key: SetStateAction<string>) => {
//       setCurrentTab(key);
//     };

//     const showModalChange = () => {
//       setShowModal(!showModal);
//     };

//     const [tabList, setTabList] = useState<Tab[]>([]);

//     useEffect(() => {
//       console.log(currentTab)
//       if (isDeveloper) {
//         setTabList([
//           { tab: 'Model Code', key: 'Code', closable: false },
//           { tab: 'Files and versions', key: 'Files', closable: false },
//           { tab: 'Data', key: 'Data', closable: false },
//         ])
//       } else {
//         setCurrentTab('Data');
//         setTabList([
//           { tab: 'Data', key: 'Data', closable: false },
//           { tab: 'Files and versions', key: 'Files', closable: false },
//           { tab: 'Model Code', key: 'Code', closable: false },
//         ])
//       }
//     }, [isDeveloper]);

//     return (
//       <div style={{ background: '#F5F7FA', paddingBlock: 30 }}>
//         <PageContainer
//           header={{
//             title: 'Tools',
//             ghost: true,
//             extra: [
//               <Button key='退出' onClick={() => showModalChange()} style={{ float: 'right', backgroundColor: 'red', color: 'white' }} >X</Button>
//             ],
//           }}
//           tabList={tabList}
//           onTabChange={onTabChange}
//         >
//           {currentTab === 'Code'
//             && <ModelsCode
//               modelValue={modelValue}
//               factorValue={factorValue}
//               setModelValue={setModelValue}
//               setFactorValue={setFactorValue}
//             />}
//           {currentTab === 'Data' && <ModelsFigure
//             factorValue={factorValue}
//             modelValue={modelValue}
//             company={company}
//             setCompany={setCompany} />}
//           {currentTab === 'Files' && <ModelsFiles />}
//           {/* {currentTab === 'Test' && <Test />} */}
//         </PageContainer>
//       </div >
//     );
//   }

// export default ModelsItems;