import React, { useState } from 'react';
import { FaChurch, FaTimes } from 'react-icons/fa';

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

interface EditChurchModalProps {
  church: Church;
  onClose: () => void;
  onUpdate: (updatedData: Church) => void;
}

const EditChurchModal: React.FC<EditChurchModalProps> = ({ church, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<Church>(church);

  const departments = [
    'La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí',
    'Chuquisaca', 'Tarija', 'Beni', 'Pando'
  ];

  const ministryOptions = [
    'Escuela Sabática', 'Música', 'Visitación', 'Jóvenes',
    'Niños', 'Evangelismo', 'Misiones', 'Damas', 'Varones'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const handleMinistryChange = (ministry: string) => {
    setFormData(prev => ({
      ...prev,
      activeMinistries: prev.activeMinistries?.includes(ministry)
        ? prev.activeMinistries.filter(m => m !== ministry)
        : [...(prev.activeMinistries || []), ministry]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FaChurch className="h-8 w-8 text-purple-600 mr-4" />
              <h2 className="text-2xl font-bold text-gray-900">Editar Iglesia</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <FaTimes className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información Básica */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">ID de Iglesia</label>
                <input
                  type="text"
                  value={formData.churchId}
                  onChange={e => setFormData(prev => ({ ...prev, churchId: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Pastor Responsable</label>
                <input
                  type="text"
                  value={formData.responsiblePastor}
                  onChange={e => setFormData(prev => ({ ...prev, responsiblePastor: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contacto</label>
                <input
                  type="text"
                  value={formData.contact}
                  onChange={e => setFormData(prev => ({ ...prev, contact: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
            </div>

            {/* Ubicación */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Departamento</label>
                <select
                  value={formData.department}
                  onChange={e => setFormData(prev => ({ ...prev, department: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ciudad/Municipio</label>
                <input
                  type="text"
                  value={formData.cityMunicipality}
                  onChange={e => setFormData(prev => ({ ...prev, cityMunicipality: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Zona/Distrito</label>
                <input
                  type="text"
                  value={formData.zoneDistrict}
                  onChange={e => setFormData(prev => ({ ...prev, zoneDistrict: e.target.value }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
            </div>

            {/* Detalles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Número de Miembros</label>
                <input
                  type="number"
                  value={formData.numberOfMembers}
                  onChange={e => setFormData(prev => ({ ...prev, numberOfMembers: parseInt(e.target.value) }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacidad del Templo</label>
                <input
                  type="number"
                  value={formData.templeCapacity}
                  onChange={e => setFormData(prev => ({ ...prev, templeCapacity: parseInt(e.target.value) }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Año de Fundación</label>
                <input
                  type="number"
                  value={formData.foundingYear}
                  onChange={e => setFormData(prev => ({ ...prev, foundingYear: parseInt(e.target.value) }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <select
                  value={formData.status}
                  onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as Church['status'] }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  required
                >
                  <option value="Active">Activo</option>
                  <option value="Growing">En Crecimiento</option>
                  <option value="In crisis">En Crisis</option>
                  <option value="Closed">Cerrado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tipo de Edificación</label>
                <select
                  value={formData.buildingType}
                  onChange={e => setFormData(prev => ({ ...prev, buildingType: e.target.value as Church['buildingType'] }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="Own temple">Propio</option>
                  <option value="Rented">Alquilado</option>
                  <option value="Under construction">En Construcción</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ingresos Mensuales</label>
                <input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={e => setFormData(prev => ({ ...prev, monthlyIncome: parseInt(e.target.value) }))}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            {/* Ministerios */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ministerios Activos</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ministryOptions.map(ministry => (
                  <label key={ministry} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={formData.activeMinistries?.includes(ministry) ?? false}
                      onChange={() => handleMinistryChange(ministry)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm text-gray-700">{ministry}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Apoyo de la Unión */}
            <div>
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={formData.supportReceived}
                  onChange={e => setFormData(prev => ({ ...prev, supportReceived: e.target.checked }))}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-700">Recibe apoyo de la Unión</span>
              </label>
            </div>

            {/* Botones */}
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditChurchModal;