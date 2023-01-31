import { Button } from 'antd';

import { invokeBackend } from '../../native-api';
import styles from './index.module.scss'

const App = (): JSX.Element => {

  const onBtnClick = async () => {
    await invokeBackend("greet", { name });

  }


  return (
    <div className={styles.container}>
      <h1>呃呃呃</h1>
      <Button onClick={onBtnClick}>点我</Button>
    </div>
  )
}

export default App;
