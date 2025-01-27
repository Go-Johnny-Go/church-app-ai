import { useState, useEffect } from "react";
import { BsEye, BsPencil, BsTrash, BsExclamationCircle, BsCheckCircle, BsXCircle } from "react-icons/bs";
import ChurchCard from "./ChurchCard";
import EditChurchModal from "./EditChurchModal";

interface Church {
  id: string;
  name: string;
  department: string;
  numberOfMembers: number;
  responsiblePastor: string;
  status: "Active" | "Growing" | "In crisis" | "Closed";
  churchId: string;
  cityMunicipality: string;
  zoneDistrict: string;
  foundingYear: number;
  contact: string;
  templeCapacity: number;
  activeMinistries?: string[];
  buildingType?: "Own temple" | "Rented" | "Under construction";
  monthlyIncome?: number;
  supportReceived?: boolean;
  socialMedia?: string[];
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  payload: Church[];
}

export default function ChurchesTable() {
  const [churches, setChurches] = useState<Church[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChurch, setSelectedChurch] = useState<Church | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [churchToDelete, setChurchToDelete] = useState<Church | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [churchToEdit, setChurchToEdit] = useState<Church | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const fetchChurches = async () => {
      try {
        const response = await fetch('https://api.churches.stage.ventulab.com/v1/churches');
        const data: ApiResponse = await response.json();
        setChurches(data.payload);
      } catch (error) {
        console.error('Error fetching churches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChurches();
  }, []);

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleView = async (id: string) => {
    try {
      const response = await fetch(`https://api.churches.stage.ventulab.com/v1/churches/${id}`);
      const data = await response.json();
      setSelectedChurch(data.payload);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching church details:', error);
    }
  };

  const handleEdit = async (id: string) => {
    try {
      const response = await fetch(`https://api.churches.stage.ventulab.com/v1/churches/${id}`);
      const data = await response.json();
      setChurchToEdit(data.payload);
      setShowEditModal(true);
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al cargar datos de la iglesia', 'error');
    }
  };

  const handleUpdate = async (updatedData: Church) => {
    try {
      const { id, responsiblePastor, name, department, cityMunicipality, zoneDistrict, contact } = updatedData;
      
      const response = await fetch(`https://api.churches.stage.ventulab.com/v1/churches/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          responsiblePastor,
          name,
          department,
          cityMunicipality,
          zoneDistrict,
          contact
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.payload.result === 'success') {
          setChurches(prevChurches => 
            prevChurches.map(church => 
              church.id === updatedData.id ? updatedData : church
            )
          );
          setShowEditModal(false);
          showNotification('Iglesia actualizada exitosamente', 'success');
        }
      } else {
        throw new Error('Error al actualizar la iglesia');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al actualizar la iglesia', 'error');
    }
  };

  const handleDelete = (church: Church) => {
    setChurchToDelete(church);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!churchToDelete?.id) return;
    
    try {
      const response = await fetch(`https://api.churches.stage.ventulab.com/v1/churches/${churchToDelete.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setChurches(prevChurches => prevChurches.filter(church => church.id !== churchToDelete.id));
        setShowDeleteModal(false);
        setChurchToDelete(null);
        showNotification('Iglesia eliminada exitosamente', 'success');
      } else {
        throw new Error('Error al eliminar la iglesia');
      }
    } catch (error) {
      console.error('Error:', error);
      showNotification('Error al eliminar la iglesia', 'error');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Directorio de Iglesias</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Iglesia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departamento</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Numero De Miembros</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pastor Responsable</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {churches.map((church) => (
                <tr key={church.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{church.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{church.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{church.numberOfMembers}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{church.responsiblePastor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      church.status === 'Active' ? 'bg-green-100 text-green-800' :
                      church.status === 'Growing' ? 'bg-blue-100 text-blue-800' :
                      church.status === 'In crisis' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {church.status}
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
                      <button onClick={() => handleDelete(church)} className="text-red-600 hover:text-red-900">
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

      {showModal && selectedChurch && (
        <ChurchCard 
          church={selectedChurch} 
          onClose={() => setShowModal(false)} 
        />
      )}

      {showEditModal && churchToEdit && (
        <EditChurchModal
          church={churchToEdit}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdate}
        />
      )}

      {showDeleteModal && churchToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center gap-3 mb-6">
              <BsExclamationCircle className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold text-gray-900">Confirmar Eliminación</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              ¿Está seguro que desea eliminar la iglesia "{churchToDelete.name}"? Esta acción no se puede deshacer.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {notification.show && (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
          notification.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {notification.type === 'success' ? (
            <BsCheckCircle className="h-5 w-5" />
          ) : (
            <BsXCircle className="h-5 w-5" />
          )}
          <p>{notification.message}</p>
        </div>
      )}
    </>
  );
}