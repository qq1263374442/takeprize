import React, { useEffect } from 'react'
import './index.css'

export default function Wheel_light() {
    const [lightcolors,setlight] = React.useState({colorA:'#fff7e8',colorB:'#e37815'});
    //设置定时器，让A组、B组灯交替闪烁
    React.useEffect(() => {
        const timer=setInterval(()=>{
            setlight(({colorA,colorB})=>{return {colorA:colorB,colorB:colorA}});
        },500);
        return () => {
            clearInterval(timer);
        }
    }, [lightcolors])
    //A组灯光
    const li4A=()=>{
        const res=[];
        for(let i=0;i<4;i++){
            res.push(<i key={i} style={{background:lightcolors.colorA}}></i>);
        }
        return res;
    }
    //B组灯光
    const li4B=()=>{
        const res=[];
        for(let i=0;i<4;i++){
            res.push(<i key={i} style={{background:lightcolors.colorB}}></i>);
        }
        return res;
    }
    return (
        // 外层闪烁
        <ul className="wheel-light">
            <li>{li4B()}</li>
            <li>{li4A()}</li>
            <li>{li4B()}</li>
            <li>{li4A()}</li>
            <li>{li4B()}</li>
            <li>{li4A()}</li>
        </ul>
    )
}