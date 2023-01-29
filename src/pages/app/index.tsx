import {Button} from 'antd';

import { invoke } from "@tauri-apps/api/tauri";
import styles from './index.module.scss'

const App = ():JSX.Element =>{

    const onBtnClick = async () => {
        await invoke("greet", { name })
    }


    return (
        <div className={styles.container}>
            <h1>呃呃呃</h1>
            <Button onClick={onBtnClick}>点我</Button>
        </div>
    )
}

export default App;
