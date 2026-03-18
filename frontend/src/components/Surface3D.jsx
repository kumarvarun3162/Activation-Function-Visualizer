import Plot from "react-plotly.js";

export default function Surface3D({data}){

if(!data) return null;

return(

<Plot
data={[
{
x:data.x1,
y:data.x2,
z:data.activation,
mode:"markers",
type:"scatter3d",
marker:{
size:4,
color:data.activation,
colorscale:"Reds"
}
}
]}

layout={{
title:"3D Activation Surface",
paper_bgcolor:"#111",
font:{color:"white"}
}}

style={{width:"100%",height:"500px"}}
/>

)

}