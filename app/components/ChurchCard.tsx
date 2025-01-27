import React from 'react';
import { 
  FaTimes, 
  FaMapMarkerAlt, 
  FaUsers, 
  FaChurch, 
  FaCalendarAlt, 
  FaUser, 
  FaBook,
  FaPhone,
  FaDollarSign,
  FaGlobe 
} from 'react-icons/fa';

interface ChurchDetails {
  id: string;
  name: string;
  department: string;
  numberOfMembers: number;
  responsiblePastor: string;
  status: "Active" | "Growing" | "In crisis" | "Closed";
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

interface ChurchCardProps {
  church: ChurchDetails;
  onClose: () => void;
}

const ChurchCard: React.FC<ChurchCardProps> = ({ church, onClose }) => {
  const getBuildingTypeLabel = (type: string | undefined) => {
    if (!type) return 'No especificado';
    const types = {
      'Own temple': 'Propio',
      'Rented': 'Alquilado',
      'Under construction': 'En Construcción'
    };
    return types[type as keyof typeof types] || type;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors"
          >
            <FaTimes className="h-5 w-5 text-gray-600" />
          </button>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{church.name}</h2>
            <div className="flex items-center text-gray-600">
              <FaMapMarkerAlt className="h-4 w-4 mr-2" />
              <span>{church.zoneDistrict}, {church.cityMunicipality}, {church.department}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <FaCalendarAlt className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Año de Fundación</p>
                  <p className="font-medium">{church.foundingYear}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaUsers className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Número de Miembros</p>
                  <p className="font-medium">{church.numberOfMembers}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaChurch className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Capacidad del Templo</p>
                  <p className="font-medium">{church.templeCapacity} personas</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaUser className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Pastor Responsable</p>
                  <p className="font-medium">{church.responsiblePastor}</p>
                </div>
              </div>

              <div className="flex items-center">
                <FaPhone className="h-5 w-5 text-purple-600 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Contacto</p>
                  <p className="font-medium">{church.contact}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Estado</p>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  church.status === 'Active' ? 'bg-green-100 text-green-800' :
                  church.status === 'Growing' ? 'bg-blue-100 text-blue-800' :
                  church.status === 'In crisis' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {church.status}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-1">Tipo de Edificación</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {getBuildingTypeLabel(church.buildingType)}
                </span>
              </div>

              {church.monthlyIncome && (
                <div>
                  <p className="text-sm text-gray-500 mb-1">Ingresos Mensuales</p>
                  <div className="flex items-center">
                    <FaDollarSign className="h-4 w-4 text-green-600 mr-1" />
                    <span className="font-medium">{church.monthlyIncome.toLocaleString('es-BO')} Bs.</span>
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm text-gray-500 mb-1">Apoyo de la Unión Bautista Boliviana</p>
                <p className="text-sm">{church.supportReceived ? 'Sí' : 'No'}</p>
              </div>
            </div>
          </div>

          {church.activeMinistries && church.activeMinistries.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <FaBook className="h-5 w-5 mr-2" />
                Ministerios Activos
              </h3>
              <div className="flex flex-wrap gap-2">
                {church.activeMinistries.map((ministry, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                  >
                    {ministry}
                  </span>
                ))}
              </div>
            </div>
          )}

          {church.socialMedia && church.socialMedia.length > 0 && (
            <div className="border-t pt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-3">Enlaces</h3>
              <div className="flex space-x-4">
                {church.socialMedia.map((link, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaGlobe className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChurchCard;