import React from 'react'
import './index.css'
import axios from 'axios'
import PubSub from 'pubsub-js'

export default function WheelPointer() {
    //点击按钮后从后台获取奖品index和中奖消息msg，通知Wheel-list进行旋转
    const takeprize = async ()=>{
        const result = await axios('https://qc1hz1.fn.thelarkcloud.com/takePrize');
        PubSub.publish('Prize',result.data);
    }
    return (    
        // 中心指针   
        <div id="pointer" className="wheel-pointer">
            <div id="button" className="button" onClick={takeprize} >
                <strong>抽</strong>
            </div>
        </div>
    )
}
