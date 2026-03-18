export default function ActivationSelector({setActivation}){

return(

<div className="bg-cardbg p-4 rounded-lg">

<h2 className="text-red-500 font-bold mb-2">
Activation Function
</h2>

<select
onChange={(e)=>setActivation(e.target.value)}
className="w-full bg-black border border-red-500 p-2 rounded"
>

<option value="relu">ReLU</option>
<option value="sigmoid">Sigmoid</option>
<option value="tanh">Tanh</option>
<option value="linear">Linear</option>
<option value="binary">Binary</option>

</select>

</div>

)
}