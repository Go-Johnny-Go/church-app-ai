import React, { useState } from 'react';
import { 
  FaChurch, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaUser, 
  FaDollarSign, 
  FaCheck, 
  FaTimes,
  FaLink,
  FaPlus 
} from 'react-icons/fa';

interface ChurchFormData {
  churchId: string;
  name: string;
  department: string;
  cityMunicipality: string;
  zoneDistrict: string;
  foundingYear: number;
  numberOfMembers: number;
  responsiblePastor: string;
  contact: string;
  status: string;
  templeCapacity: number;
  activeMinistries: string[];
  buildingType: string;
  monthlyIncome: number;
  supportReceived: boolean;
  socialMedia: string[];
}

const ChurchRegistrationForm: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState<ChurchFormData>({
    churchId: '',
    name: '',
    department: '',
    cityMunicipality: '',
    zoneDistrict: '',
    foundingYear: new Date().getFullYear(),
    numberOfMembers: 0,
    responsiblePastor: '',
    contact: '',
    status: 'Growing',
    templeCapacity: 0,
    activeMinistries: [],
    buildingType: 'Own',
    monthlyIncome: 0,
    supportReceived: false,
    socialMedia: ['']
  });

  const departments = [
    'La Paz', 'Cochabamba', 'Santa Cruz', 'Oruro', 'Potosí',
    'Chuquisaca', 'Tarija', 'Beni', 'Pando'
  ];

  const ministryOptions = [
    'Escuela Sabática', 'Música', 'Visitación', 'Jóvenes',
    'Niños', 'Evangelismo', 'Misiones', 'Damas', 'Varones'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('https://api.churches.stage.ventulab.com/v1/churches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        throw new Error('Error al registrar la iglesia');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleMinistryChange = (ministry: string) => {
    setFormData(prev => ({
      ...prev,
      activeMinistries: prev.activeMinistries.includes(ministry)
        ? prev.activeMinistries.filter(m => m !== ministry)
        : [...prev.activeMinistries, ministry]
    }));
  };

  const handleSocialMediaChange = (index: number, value: string) => {
    const newSocialMedia = [...formData.socialMedia];
    newSocialMedia[index] = value;
    setFormData(prev => ({ ...prev, socialMedia: newSocialMedia }));
  };

  const addSocialMediaField = () => {
    setFormData(prev => ({
      ...prev,
      socialMedia: [...prev.socialMedia, '']
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-8">
          <FaChurch className="h-8 w-8 text-purple-600 mr-4" />
          <h2 className="text-2xl font-bold text-gray-900">Registro de Nueva Iglesia</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
  {/* ID y Nombre */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaChurch className="mr-2" />
        ID de Iglesia
      </label>
      <input
        type="text"
        value={formData.churchId}
        onChange={e => setFormData(prev => ({ ...prev, churchId: e.target.value }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="Ej: COC-001"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaChurch className="mr-2" />
        Nombre de la Iglesia
      </label>
      <input
        type="text"
        value={formData.name}
        onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="Nombre completo de la iglesia"
        required
      />
    </div>
  </div>

  {/* Ubicación */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaMapMarkerAlt className="mr-2" />
        Departamento
      </label>
      <select
        value={formData.department}
        onChange={e => setFormData(prev => ({ ...prev, department: e.target.value }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        required
      >
        <option value="">Seleccione departamento</option>
        {departments.map(dept => (
          <option key={dept} value={dept}>{dept}</option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaMapMarkerAlt className="mr-2" />
        Ciudad/Municipio
      </label>
      <input
        type="text"
        value={formData.cityMunicipality}
        onChange={e => setFormData(prev => ({ ...prev, cityMunicipality: e.target.value }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="Ciudad o municipio"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaMapMarkerAlt className="mr-2" />
        Zona/Distrito
      </label>
      <input
        type="text"
        value={formData.zoneDistrict}
        onChange={e => setFormData(prev => ({ ...prev, zoneDistrict: e.target.value }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="Zona o distrito"
        required
      />
    </div>
  </div>

  {/* Detalles de la Iglesia */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaChurch className="mr-2" />
        Año de Fundación
      </label>
      <input
        type="number"
        value={formData.foundingYear}
        onChange={e => setFormData(prev => ({ ...prev, foundingYear: parseInt(e.target.value) }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        min="1900"
        max={new Date().getFullYear()}
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaUsers className="mr-2" />
        Número de Miembros
      </label>
      <input
        type="number"
        value={formData.numberOfMembers}
        onChange={e => setFormData(prev => ({ ...prev, numberOfMembers: parseInt(e.target.value) }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        min="0"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaUsers className="mr-2" />
        Capacidad del Templo
      </label>
      <input
        type="number"
        value={formData.templeCapacity}
        onChange={e => setFormData(prev => ({ ...prev, templeCapacity: parseInt(e.target.value) }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        min="0"
        required
      />
    </div>
  </div>

  {/* Pastor y Contacto */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaUser className="mr-2" />
        Pastor Responsable
      </label>
      <input
        type="text"
        value={formData.responsiblePastor}
        onChange={e => setFormData(prev => ({ ...prev, responsiblePastor: e.target.value }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="Nombre del pastor"
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaUser className="mr-2" />
        Contacto
      </label>
      <input
        type="tel"
        value={formData.contact}
        onChange={e => setFormData(prev => ({ ...prev, contact: e.target.value }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        placeholder="+591 xxxxxxxx"
        required
      />
    </div>
  </div>

  {/* Estado y Tipo de Edificación */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaChurch className="mr-2" />
        Estado
      </label>
      <select
        value={formData.status}
        onChange={e => setFormData(prev => ({ ...prev, status: e.target.value }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        required
      >
        <option value="Growing">En Crecimiento</option>
        <option value="Stable">Estable</option>
        <option value="Declining">En Declive</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaChurch className="mr-2" />
        Tipo de Edificación
      </label>
      <select
        value={formData.buildingType}
        onChange={e => setFormData(prev => ({ ...prev, buildingType: e.target.value }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        required
      >
        <option value="Own">Propio</option>
        <option value="Rented">Alquilado</option>
        <option value="Under construction">En Construcción</option>
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
        <FaDollarSign className="mr-2" />
        Ingresos Mensuales (Bs)
      </label>
      <input
        type="number"
        value={formData.monthlyIncome}
        onChange={e => setFormData(prev => ({ ...prev, monthlyIncome: parseInt(e.target.value) }))}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        min="0"
        required
      />
    </div>
  </div>

  {/* Ministerios */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
      <FaUsers className="mr-2" />
      Ministerios Activos
    </label>
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {ministryOptions.map(ministry => (
        <label key={ministry} className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={formData.activeMinistries.includes(ministry)}
            onChange={() => handleMinistryChange(ministry)}
            className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
          />
          <span className="text-sm text-gray-700">{ministry}</span>
        </label>
      ))}
    </div>
  </div>

  {/* Redes Sociales */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
      <FaLink className="mr-2" />
      Redes Sociales
    </label>
    <div className="space-y-3">
      {formData.socialMedia.map((url, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={e => handleSocialMediaChange(index, e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="https://"
          />
          {index === formData.socialMedia.length - 1 && (
            <button
              type="button"
              onClick={addSocialMediaField}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
            >
              <FaPlus />
            </button>
          )}
        </div>
      ))}
    </div>
  </div>

  {/* Apoyo Recibido */}
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

  {/* Botón de Envío */}
  <div className="flex justify-end">
    <button
      type="submit"
      className="flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
    >
      <FaCheck className="mr-2" />
      Registrar Iglesia
    </button>
  </div>
</form>
      </div>

      {showSuccess && (
        <div className="fixed bottom-4 right-4 bg-green-50 border-l-4 border-green-400 p-4 rounded-lg shadow-lg">
          <div className="flex items-center">
            <FaCheck className="h-5 w-5 text-green-400" />
            <div className="ml-3">
              <p className="text-sm text-green-800">
                ¡Iglesia registrada exitosamente!
              </p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="ml-auto text-green-500 hover:text-green-600"
            >
              <FaTimes className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChurchRegistrationForm;