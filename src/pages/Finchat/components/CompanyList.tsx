import React, { useState } from 'react';

import styles from './index.less';
interface InternalProps {
  list: any[];
  handleProps: (item: any) => void;
}

const CompanyList: React.FC<InternalProps> = ({ list, handleProps }) => {
  const [selectedList, setSelectedList] = useState<any[]>([]);
  const tempList = [
    {
      src: 'https://www.stratosphere.io/assets/images/search/logos/AAPL.svg',
      name: 'Apple Inc.'
    },
    {
      src: 'https://www.stratosphere.io/assets/images/search/logos/2222.SR.svg',
      name: 'Saudi Arabian Oil Company'
    },
    {
      src: 'https://www.stratosphere.io/assets/images/search/logos/MSFT.svg',
      name: 'Microsoft Corporation'
    },
    {
      src: 'https://www.stratosphere.io/assets/images/search/logos/AMZN.svg',
      name: 'Amazon.com, Inc.'
    },
    {
      src: 'https://www.stratosphere.io/assets/images/search/logos/TSLA.svg',
      name: 'Tesla, Inc.'
    }
  ];

  const handleChooseCompany = (item: any) => {
    const tempList = [...selectedList];
    const index = tempList.findIndex((i: any) => i.company === item.company);
    if (index !== -1) {
      tempList.splice(index, 1);
    } else {
      tempList.push(item);
    }
    setSelectedList(tempList);
    handleProps(tempList);
  };

  return (
    <div className={styles.wrapList}>
      {list.map((item, index) => (
        <p
          key={item.company + index}
          className={
            selectedList.some(i => i.company === item.company)
              ? styles.active
              : ''
          }
          onClick={() => handleChooseCompany(item)}>
          <img src={item.src ? item.src : tempList[index % 5]?.src} />
          {item.company}
        </p>
      ))}
    </div>
  );
};

export default CompanyList;
