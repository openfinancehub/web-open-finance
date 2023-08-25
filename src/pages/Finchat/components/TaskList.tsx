import styles from './index.less';

interface InternalProps {
  list: any[];
  handleProps: (item: any) => void;
}

const TaskList: React.FC<InternalProps> = ({ list, handleProps }) => {
  const handleChooseTask = (item: any) => {
    console.log(item, 999);
    handleProps(item);
  };

  return (
    <div className={styles.wrapList}>
      {list.map((item, index) => (
        <p key={item + index} onClick={() => handleChooseTask(item)}>
          <span className={styles.personName}>{item}</span>
        </p>
      ))}
    </div>
  );
};

export default TaskList;
