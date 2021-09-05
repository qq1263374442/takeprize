import React,{useEffect,useState} from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default function Showprize() {
    const [prizemsg,setprizemsg]=useState("");
    const [display,setdisplay]=useState();
    // 订阅消息：收到消息后设置中奖消息，弹出中奖信息
    useEffect(() => {
        const token= PubSub.subscribe('Showprize',(msg,item)=>{
            //设置中奖消息
            setprizemsg(item);
            //弹出中奖信息
            setdisplay('block');
        })
        return () => {
            PubSub.unsubscribe(token);
        }
    }, [prizemsg])
    //关闭中奖信息
    const close=()=>{
        setdisplay('none');
    }
    return (
        // 遮罩层+弹出奖品
        <>
            {/* 遮罩层 */}
            <div className="mask" style={{display:display}} ></div>
            {/* 弹出奖品 */}
            <div className="show-prize" style={{display:display}} >
                <img src="./images/prize.png" alt="" className="prize-container"/>
                <div className="prize-info">{prizemsg}</div>
                <img src="./images/close.png" alt="" className="close" onClick={close} />
            </div>
        </>
    )
}
