import React,{useState,useEffect} from 'react'
import PubSub from 'pubsub-js';
import './index.css'

export default function Twinkle() {
    //闪烁动画状态
    const [twinkle_animate,settwinkle]=useState();
    //订阅消息：收到消息后进行闪烁动画，之后通知Showprize展示奖品信息
    useEffect(() => {
        const token=PubSub.subscribe('Twinkle',(msg,item)=>{
            // 进行闪烁动画
            settwinkle('twinkle 0.8s');
            // 通知Showprize展示奖品信息
            setTimeout(() => {
                settwinkle('none');
                // 通知展示中奖消息
                PubSub.publish('Showprize',item);
            }, 1000);
        })
        return () => {
            PubSub.unsubscribe(token);
        }
    }, [twinkle_animate])
    return (
        // 中奖后闪烁
        <div className="twinkle-box">
            <div id="twinkle" className="twinkle" style={{animation:twinkle_animate}} ></div>
        </div>
    )
}
