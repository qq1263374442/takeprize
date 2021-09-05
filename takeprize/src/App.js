import './App.css';
import Wheellight from './component/Wheel-light';
import WheelList from './component/Wheel-list';
import WheelPointer from './component/Wheel-pointer';
import Twinkle from './component/Twinkle';
import Showprize from './component/Showprize';

function App() {
  return (
    <>
      {/* 抽奖轮盘：外层闪烁+中间奖品+中心指针+中奖后闪烁 */}
      <div className="wheel">
        <Wheellight/>
        <WheelList/>
        <WheelPointer/>
        <Twinkle/>
      </div>
      {/* 遮罩层+弹出奖品 */}
      <Showprize/>
    </>
  );
}

export default App;
