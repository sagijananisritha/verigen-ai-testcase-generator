import { useState } from "react";

export default function App() {

const [requirement,setRequirement] = useState("");

return (

<div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100">

{/* HEADER */}

<div className="text-center py-10 bg-white shadow-md">

<h1 className="text-4xl font-bold text-indigo-600">
VeriGen AI
</h1>

<p className="text-gray-500 mt-2">
Intelligent Software Test Case Generator
</p>

</div>


{/* MAIN CONTAINER */}

<div className="max-w-5xl mx-auto mt-12 space-y-10">


{/* REQUIREMENT ANALYZER */}

<div className="bg-white rounded-3xl shadow-xl p-8">

<h2 className="text-2xl font-semibold mb-4">
Requirement Analyzer
</h2>

<textarea
value={requirement}
onChange={(e)=>setRequirement(e.target.value)}
placeholder="Enter software requirement..."
className="w-full h-32 p-4 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-300"
/>


<div className="mt-4 flex items-center gap-4">

<label className="text-gray-600">
Input Format:
</label>

<select className="border rounded-lg p-2">

<option>Text Input</option>
<option>Upload File</option>
<option>API Specification</option>

</select>

</div>


{/* FILE UPLOAD */}

<div className="mt-4">

<label className="block text-gray-600 mb-2">
Upload Requirement File
</label>

<input
type="file"
className="border rounded-lg p-2 bg-gray-50"
/>

</div>


<div className="flex gap-4 mt-6">

<button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-md">
Generate Test Cases
</button>

<button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow-md">
Export CSV
</button>

</div>

</div>


{/* COVERAGE ANALYSIS */}

<div className="bg-white rounded-3xl shadow-xl p-8">

<h2 className="text-2xl font-semibold mb-6">
Coverage Analysis
</h2>

<div className="grid grid-cols-3 gap-6">


<div className="bg-indigo-50 rounded-2xl p-6 text-center shadow">

<h3 className="text-3xl font-bold text-indigo-600">
0
</h3>

<p className="text-gray-600 mt-2">
Positive Cases
</p>

</div>


<div className="bg-blue-50 rounded-2xl p-6 text-center shadow">

<h3 className="text-3xl font-bold text-blue-600">
0
</h3>

<p className="text-gray-600 mt-2">
Negative Cases
</p>

</div>


<div className="bg-purple-50 rounded-2xl p-6 text-center shadow">

<h3 className="text-3xl font-bold text-purple-600">
0
</h3>

<p className="text-gray-600 mt-2">
Edge Cases
</p>

</div>


</div>

</div>


{/* RISK PRIORITIZATION */}

<div className="bg-white rounded-3xl shadow-xl p-8">

<h2 className="text-2xl font-semibold mb-6">
Risk Based Prioritization
</h2>

<div className="grid grid-cols-3 gap-6">


<div className="bg-red-100 rounded-2xl p-6 text-center shadow">

<h3 className="text-3xl font-bold text-red-600">
0
</h3>

<p className="text-gray-600 mt-2">
High Risk
</p>

</div>


<div className="bg-yellow-100 rounded-2xl p-6 text-center shadow">

<h3 className="text-3xl font-bold text-yellow-600">
0
</h3>

<p className="text-gray-600 mt-2">
Medium Risk
</p>

</div>


<div className="bg-green-100 rounded-2xl p-6 text-center shadow">

<h3 className="text-3xl font-bold text-green-600">
0
</h3>

<p className="text-gray-600 mt-2">
Low Risk
</p>

</div>


</div>

</div>


</div>

</div>

);

}
