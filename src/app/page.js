import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
  
  const { data: rambu, error } = await supabase
    .from('traffic_signs')
    .select('*');

  if (error) console.log("Error:", error);

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Rambu Pintar
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rambu?.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
            <p className="text-gray-600 mt-2">{item.description}</p>
            <div className="mt-4 bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded inline-block">
              Poin: {item.points}
            </div>
          </div>
        ))}
      </div>
      
      {!rambu && <p className="text-center">Loading data...</p>}
    </div>
  );
}