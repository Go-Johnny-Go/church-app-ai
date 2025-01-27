import { BsEye, BsPencil, BsTrash } from "react-icons/bs";

export default function EventsTable() {
  const churches = [
    {
      id: 1,
      photo: "userDefault.jpg",
      name: "Saint Mary's Cathedral",
      phone: "+1 (555) 111-2233",
      email: "stmarys@example.com",
      status: "active"
    },
    {
      id: 2,
      photo: "userDefault.jpg",
      name: "Grace Community Church",
      phone: "+1 (555) 444-5566",
      email: "grace@example.com",
      status: "inactive"
    },
    {
      id: 3,
      photo: "userDefault.jpg",
      name: "Holy Trinity Chapel",
      phone: "+1 (555) 777-8899",
      email: "trinity@example.com",
      status: "active"
    }
  ];

  const handleView = (id: string | number) => console.log('View:', id);
  const handleEdit = (id: string | number) => console.log('Edit:', id);
  const handleDelete = (id: string | number) => console.log('Delete:', id);

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Events Directory</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {churches.map((church) => (
              <tr key={church.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={church.photo}
                    alt={church.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{church.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{church.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{church.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${church.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {church.status.charAt(0).toUpperCase() + church.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button onClick={() => handleView(church.id)} className="text-purple-600 hover:text-purple-900">
                      <BsEye className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleEdit(church.id)} className="text-blue-600 hover:text-blue-900">
                      <BsPencil className="h-5 w-5" />
                    </button>
                    <button onClick={() => handleDelete(church.id)} className="text-red-600 hover:text-red-900">
                      <BsTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}