import { useState } from "react";

export default function DatasetControls({ onGenerate }) {

const [samples,setSamples] = useState(200);
const [features,setFeatures] = useState(2);
const [redundant,setRedundant] = useState(0);
const [clusters,setClusters] = useState(1);

return(

<div className="bg-cardbg p-4 rounded-lg space-y-3">

<h2 className="text-red-500 font-bold text-lg">
Dataset Controls
</h2>

{/* Samples */}
<div>
<label className="text-sm">Samples</label>
<input
type="number"
value={samples}
onChange={(e)=>setSamples(Number(e.target.value))}
className="w-full bg-black border border-red-500 p-2 rounded"
/>
</div>

{/* Features */}
<div>
<label className="text-sm">Features</label>
<input
type="number"
value={features}
onChange={(e)=>setFeatures(Number(e.target.value))}
className="w-full bg-black border border-red-500 p-2 rounded"
/>
</div>

{/* Redundant */}
<div>
<label className="text-sm">Redundant Features</label>
<input
type="number"
value={redundant}
onChange={(e)=>setRedundant(Number(e.target.value))}
className="w-full bg-black border border-red-500 p-2 rounded"
/>
</div>

{/* Clusters */}
<div>
<label className="text-sm">Clusters Per Class</label>
<input
type="number"
value={clusters}
onChange={(e)=>setClusters(Number(e.target.value))}
className="w-full bg-black border border-red-500 p-2 rounded"
/>
</div>

<button
onClick={()=>onGenerate({
n_samples:samples,
n_features:features,
n_redundant:redundant,
clusters:clusters
})}

className="mt-3 w-full bg-red-600 py-2 rounded hover:bg-red-700 transition"
>
Generate Dataset
</button>

</div>

)
}