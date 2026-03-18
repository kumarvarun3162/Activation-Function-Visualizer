import {useState} from "react";

import DatasetControls from "./components/DatasetControls";
import ActivationSelector from "./components/ActivationSelector";
import ScatterPlot from "./components/ScatterPlot";
import Surface3D from "./components/Surface3D";

import {generateVisualization} from "./services/api";

function App(){

const [data,setData] = useState(null);
const [activation,setActivation] = useState("relu");

const handleGenerate = async(params)=>{

const response = await generateVisualization({
...params,
activation
});

setData(response);

};

return(

<div className="p-6">

<h1 className="text-3xl text-red-500 font-bold mb-6">
Activation Function Visualizer
</h1>

<div className="grid grid-cols-4 gap-4">

<div className="col-span-1 space-y-4">

<DatasetControls onGenerate={handleGenerate}/>
<ActivationSelector setActivation={setActivation}/>

</div>

<div className="col-span-3 space-y-6">

<ScatterPlot data={data}/>
<Surface3D data={data}/>

</div>

</div>

</div>

)
}

export default App