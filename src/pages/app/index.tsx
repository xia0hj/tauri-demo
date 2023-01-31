import { Button } from 'antd';
import { useState } from 'react';

import { showOpenFileDialog } from '@/native-api';
import styles from './index.module.scss'

const App = (): JSX.Element => {

  const [curPath, setCurPath] = useState('');


  // btn click event
  const onBtnAdd = async () => {
    showOpenFileDialog().then(path => {
      console.log('add', { path });
      if (path !== null) {
        setCurPath(path);
      }
    })
  }

  const onBtnRun = async () => {

  }

  return (
    <div className={styles.container}>
      <div>
        <Button onClick={onBtnAdd}>add</Button>
        <Button onClick={onBtnRun}>run</Button>
      </div>
      <div className={styles['debug-output']}>
        <p>Path: {curPath}</p>
      </div>
    </div>
  )
}

export default App;
