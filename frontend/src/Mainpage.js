import {useState} from 'react';
import './Mainpage.css'
import { useBody } from './hooks/useBody';
// import public shared component:
import Header from './containers/Public/Header'
import Title from './containers/Public/Title'
import Footer from './containers/Public/footer';
// import Utilities:
import GaborTransform from './containers/Utilities/GaborTransform/Body';
import SpeedAdjustment from './containers/Utilities/SpeedAdjustment/Body2';
import NoiseReductionEnhancement from './containers/Utilities/NoiseReductionEnhancement/Body3';
// import Dashboards:
import GaborTransformDashboard from './containers/Utilities/GaborTransform/BodyDashboard';
import NoiseReductionEnhancementDashboard from './containers/Utilities/NoiseReductionEnhancement/BodyDashboard';


function Mainpage(){
    const {currFunc} = useBody();
    const [prevFunc, setPrevFunc] = useState("GaborTransform");
    const [dashboard, setDashboard] = useState(<GaborTransformDashboard/>)
    const [body, setBody] = useState(<GaborTransform/>);

    if (currFunc === "GaborTransform" && prevFunc != currFunc) {
        setBody(<GaborTransform/>);
        setDashboard(<GaborTransformDashboard/>);
        setPrevFunc("GaborTransform")
    }
    else if (currFunc === "SpeedAdjustment" && prevFunc != currFunc) {
        setBody(<SpeedAdjustment/>);
        setPrevFunc("SpeedAdjustment")
    }
    else if (currFunc === "NoiseReductionEnhancement" && prevFunc != currFunc) {
        setBody(<NoiseReductionEnhancement/>);
        setDashboard(<NoiseReductionEnhancementDashboard/>);
        setPrevFunc("NoiseReductionEnhancement")
    }

    const Enter = (
        <div id="body" style ={{backgroundImage:"linear-gradient(to right, #bbdefb, #002966)", backgroundRepeat: "repeat-y"}}>
            <Header/>
            <Title/> 
            {dashboard}
            {body}
            <Footer/>
        </div>
    );
    
    return (
        <>{Enter}</>
    )
}
export default Mainpage;