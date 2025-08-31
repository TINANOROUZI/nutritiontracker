import { useEffect, useMemo, useState } from "react";
import { me, saveHistory } from "../api";

export default function BmiWidget(){
  const [h,setH]=useState(()=>Number(localStorage.getItem("bmi_h"))||170);
  const [w,setW]=useState(()=>Number(localStorage.getItem("bmi_w"))||65);
  const [msg,setMsg]=useState("");

  useEffect(()=>{ localStorage.setItem("bmi_h",String(h)); localStorage.setItem("bmi_w",String(w)); },[h,w]);

  const {bmi,label,color}=useMemo(()=>{
    const m = Math.max(0.8, Math.min(2.5, (Number(h)||0)/100));
    const kg= Math.max(20, Math.min(300, Number(w)||0));
    const v = +(kg/(m*m)).toFixed(1);
    let label="Underweight", color="#60a5fa";
    if(v>=18.5&&v<25){label="Healthy";color="#10b981"}
    else if(v>=25&&v<30){label="Overweight";color="#f59e0b"}
    else if(v>=30){label="Obese";color="#ef4444"}
    return {bmi:v,label,color};
  },[h,w]);

  async function save(){
    try{
      setMsg("");
      const u = await me();
      if(!u){ setMsg("Please log in first."); return; }
      await saveHistory({type:"bmi", value:bmi, heightCm:Number(h), weightKg:Number(w), label, ts:new Date().toISOString()});
      setMsg("Saved to history ✅");
      setTimeout(()=>setMsg(""),3500);
    }catch(e){ setMsg(e.message||"Could not save"); }
  }

  return (
    <div className="bmi-card">
      <div style={{fontWeight:800,marginBottom:8}}>💚 BMI Calculator</div>
      <div className="bmi-io">
        <label>Height (cm)
          <input type="number" min="80" max="250" value={h} onChange={e=>setH(e.target.value)} />
        </label>
        <label>Weight (kg)
          <input type="number" min="20" max="300" value={w} onChange={e=>setW(e.target.value)} />
        </label>
      </div>

      <div style={{textAlign:"center"}}>
        <div className="bmi-value" style={{"--accent":color}}>{bmi}</div>
        <div className="bmi-label" style={{color}}>{label}</div>
        <p className="bmi-tip">Small daily habits beat big occasional efforts. Hydrate, move, sleep.</p>
        <button className="btn-primary" onClick={save}>Save to History</button>
        {msg && <div className="bmi-msg">{msg}</div>}
      </div>
    </div>
  );
}
