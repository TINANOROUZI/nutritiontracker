import { useMemo, useState } from "react";
import { analyzeImage, computeNutrition, saveHistory, me } from "../api";

export default function QuickAnalyze(){
  const [file,setFile]=useState(null);
  const [imgURL,setImgURL]=useState("");
  const [loading,setLoading]=useState(false);
  const [preds,setPreds]=useState([]);    // [{label,score}]
  const [selected,setSelected]=useState("");
  const [grams,setGrams]=useState(150);
  const [macros,setMacros]=useState(null);
  const [msg,setMsg]=useState("");

  function onPick(e){
    const f = e.target.files?.[0];
    if(!f) return;
    setFile(f);
    setImgURL(URL.createObjectURL(f));
    setPreds([]); setMacros(null); setSelected("");
  }

  async function run(){
    if(!file) return;
    setLoading(true); setMsg(""); setPreds([]); setMacros(null); setSelected("");
    try{
      const r = await analyzeImage(file);
      const arr = (r?.predictions||r?.suggestions||[]).map(x=>({label:x.label||x.rawLabel||x.key, score:x.score||0}));
      setPreds(arr);
      if(arr[0]) setSelected((arr[0].label||"").toLowerCase().replace(/[^a-z0-9]+/g,"_"));
    }catch(e){ setMsg(e.message||"Analyze failed"); }
    finally{ setLoading(false); }
  }

  async function compute(){
    if(!selected) return;
    setLoading(true); setMsg("");
    try{
      const r = await computeNutrition(selected, grams);
      setMacros(r);
    }catch(e){ setMsg(e.message||"Nutrition error"); }
    finally{ setLoading(false); }
  }

  const topChips = useMemo(()=>(
    preds.slice(0,6).map(p=>{
      const key=(p.label||"").toLowerCase().replace(/[^a-z0-9]+/g,"_");
      const pct=Math.round((p.score||0)*100);
      return {key,pct,raw:p.label};
    })
  ),[preds]);

  async function save(){
    try{
      const u = await me();
      if(!u){ setMsg("Please log in first."); return; }
      if(!macros) return;
      await saveHistory({type:"meal", foodKey:selected, grams, ...macros, ts:new Date().toISOString()});
      setMsg("Saved to history ✅");
      setTimeout(()=>setMsg(""),3500);
    }catch(e){ setMsg(e.message||"Save failed"); }
  }

  return (
    <div className="qa-card">
      <div className="qa-top">
        <div><strong>Analyze a photo</strong></div>
        <label className="file">📸 Choose image
          <input type="file" accept="image/*" onChange={onPick}/>
        </label>
        <button className="btn" onClick={run} disabled={!file || loading}>{loading?"Analyzing…":"Analyze"}</button>
      </div>

      {imgURL && (
        <div className="qa-preview">
          <img src={imgURL} alt="preview"/>
        </div>
      )}

      {topChips.length>0 && (
        <div style={{marginTop:6}}>
          <div style={{marginBottom:6,color:"var(--muted)"}}>Pick the closest food</div>
          <div className="chips">
            {topChips.map(c=>(
              <button key={c.key}
                className={`chip ${selected===c.key?"chip--on":""}`}
                onClick={()=>setSelected(c.key)}
                title={c.raw}
              >
                {c.raw} {c.pct ? `${c.pct}%` : ""}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="slider-row">
        <div style={{color:"var(--muted)"}}>Portion</div>
        <input type="range" min="20" max="400" step="10" value={grams} onChange={e=>setGrams(Number(e.target.value))}/>
        <div style={{minWidth:56,textAlign:"right"}}>{grams} g</div>
        <button className="btn-primary" onClick={compute} disabled={!selected || loading}>Compute</button>
      </div>

      {macros && (
        <>
          <div style={{color:"var(--muted)",marginTop:6}}>Estimated nutrition</div>
          <div className="metrics">
            <div className="metric"><div className="k">{macros.kcal}</div><div className="v">Calories</div></div>
            <div className="metric"><div className="k">{macros.protein} g</div><div className="v">Protein</div></div>
            <div className="metric"><div className="k">{macros.carbs} g</div><div className="v">Carbs</div></div>
            <div className="metric"><div className="k">{macros.fat} g</div><div className="v">Fat</div></div>
          </div>
          <button className="btn-primary" onClick={save}>Save to History</button>
        </>
      )}

      {msg && <div style={{marginTop:8,color:"#a3e635",fontWeight:700}}>{msg}</div>}
    </div>
  );
}
