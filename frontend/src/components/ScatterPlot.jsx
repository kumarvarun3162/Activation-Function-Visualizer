import Plot from "react-plotly.js";

export default function ScatterPlot({data}){

if(!data) return null;

return(

<Plot
data={[
{
x:data.x1,
y:data.x2,
mode:"markers",
type:"scatter",
marker:{
color:data.activation,
colorscale:"Reds",
size:8
}
}
]}

layout={{
title:"Dataset Scatter Plot",
paper_bgcolor:"#111",
plot_bgcolor:"#111",
font:{color:"white"}
}}

style={{width:"100%",height:"400px"}}
/>

)

}