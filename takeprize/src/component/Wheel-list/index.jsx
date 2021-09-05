import React,{useState,useEffect} from 'react'
import axios from 'axios';
import './index.css'
import { nanoid } from 'nanoid';
import PubSub from 'pubsub-js';

//包含6个唯一id的数组，用来生成奖项
const initdata = new Array(6).fill(0).map(()=>nanoid());
export default function WheelList() {
    //奖品信息
    const [data, setdata] = useState([]);
    //奖品index和中奖消息
    const [prize,setprize] = useState();
    // 旋转动画
    const [rotate_animate,setrotate] = useState({angle:0,transition:'none'});
    //从后台获取需要进行展示的奖品信息，并且保证为6个
    
    useEffect(() => {
        const fetchData=async ()=>{
            // 获取奖品信息
            const result = await axios('https://qc1hz1.fn.thelarkcloud.com/prizeinfo');
            const prize_info = result.data.response;
            // 计算奖品数量，保证其为6个
            const n=prize_info.length;
            if(n<6){
                for(let i=n;i<6;i++){
                    prize_info.push({prize_name: "谢谢参与", isprize: false,prize_id:nanoid()});
                }   
            }
            if(n>6){
                while(prize_info.length>6){
                    prize_info.pop();
                }
            }
            setdata(prize_info);
        }
        fetchData();
    }, [])
    
    //订阅消息：收到消息后进行旋转
    useEffect(() => {
        const token = PubSub.subscribe('Prize',(msg,item)=>{
            // 保存奖品index和中奖消息msg
            setprize(item);
            // 计算要旋转的角度并旋转
            const angle=-item.prize_index*60+3600;
            setrotate({angle:angle,transition:'all 5s ease-out'});
            //旋转完成后
            setTimeout(() => {
                //对角度进行处理，以便下次旋转
                setrotate({angle:angle%360,transition:'none'});
                //通知闪烁,同时把中奖消息发送过去
                PubSub.publish('Twinkle',item.msg);
            }, 5000);
        })
        return () => {
            PubSub.unsubscribe(token);
        }
    }, [prize,rotate_animate])

    return (
        //中间奖品
        <ul id="wheel" className="wheel-list" style={{
            transform:`rotate(${rotate_animate.angle}deg)`,
            transition:rotate_animate.transition
        }} >
            {
                initdata.map((item,index)=>(
                    <li key={item} >
                        <i></i>
                        <div className="prize">
                            <p>{data[index]?data[index].prize_name:""}</p>
                            <img src={`/images/prize_img${index+1}.png`} alt="" />
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}
