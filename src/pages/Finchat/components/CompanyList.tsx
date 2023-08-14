import React from 'react';

import styles from './index.less';
interface InternalProps {
  list: any[];
  handleProps: (item: any) => void;
}

const CompanyList: React.FC<InternalProps> = ({ list, handleProps }) => {
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

  const handleChooseCompany = item => {
    console.log(item, 'item');
    handleProps(item);
  };

  return (
    <div className={styles.wrapList}>
      {list.map((item, index) => (
        <p key={item.company + index} onClick={() => handleChooseCompany(item)}>
          <img src={item.src ? item.src : tempList[index % 5]?.src} />
          {item.company}
        </p>
      ))}
    </div>
  );
};

export default CompanyList;
