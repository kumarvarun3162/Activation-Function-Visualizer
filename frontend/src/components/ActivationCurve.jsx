import Plot from "react-plotly.js";

export default function ActivationCurve({curve}){

if(!curve) return null;

return(

<Plot
data={[
{
x:curve.x,
y:curve.y,
type:"scatter",
mode:"lines",
line:{color:"red"}
}
]}

layout={{
title:"Activation Function Curve",
paper_bgcolor:"#111",
font:{color:"white"}
}}

style={{width:"100%",height:"400px"}}
/>

)

}