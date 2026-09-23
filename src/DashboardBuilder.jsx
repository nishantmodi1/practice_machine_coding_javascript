import React, { useState } from 'react';
import { Grip, Plus, Settings, Trash2, Table as TableIcon, LayoutGrid, Save, Eye } from 'lucide-react';

// Dummy data for components
const DUMMY_DATA = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Active', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Active', role: 'User' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', status: 'Inactive', role: 'User' },
    { id: 4, name: 'Alice Williams', email: 'alice@example.com', status: 'Active', role: 'Manager' },
  ],
  stats: {
    totalUsers: 1247,
    revenue: '$45,231',
    orders: 342,
    growth: '+12.5%'
  }
};

const ComponentPalette = ({ onDragStart }) => {
  const components = [
    { type: 'table', icon: TableIcon, label: 'Table', color: 'bg-blue-500' },
    { type: 'card', icon: LayoutGrid, label: 'Stats Card', color: 'bg-purple-500' },
  ];

  return (
    <div className="w-64 bg-gray-900 text-white p-4 flex flex-col gap-4">
      <div className="flex items-center gap-2 mb-4">
        <Plus className="w-5 h-5" />
        <h2 className="font-semibold text-lg">Components</h2>
      </div>
      
      <div className="space-y-2">
        {components.map((comp) => (
          <div
            key={comp.type}
            draggable
            onDragStart={(e) => onDragStart(e, comp.type)}
            className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg cursor-move hover:bg-gray-700 transition-colors"
          >
            <div className={`${comp.color} p-2 rounded`}>
              <comp.icon className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium">{comp.label}</span>
            <Grip className="w-4 h-4 ml-auto text-gray-500" />
          </div>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-400">Drag components to canvas</p>
      </div>
    </div>
  );
};

const TableComponent = ({ data, onSelect, isSelected }) => {
  return (
    <div 
      onClick={onSelect}
      className={`bg-white rounded-lg shadow-lg p-4 h-full cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-800">Users Table</h3>
        <TableIcon className="w-5 h-5 text-gray-500" />
      </div>
      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left p-2 font-medium text-gray-600">ID</th>
              <th className="text-left p-2 font-medium text-gray-600">Name</th>
              <th className="text-left p-2 font-medium text-gray-600">Email</th>
              <th className="text-left p-2 font-medium text-gray-600">Status</th>
              <th className="text-left p-2 font-medium text-gray-600">Role</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-b hover:bg-gray-50">
                <td className="p-2 text-gray-700">{row.id}</td>
                <td className="p-2 text-gray-700">{row.name}</td>
                <td className="p-2 text-gray-700">{row.email}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    row.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="p-2 text-gray-700">{row.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const CardComponent = ({ stats, onSelect, isSelected }) => {
  const cards = [
    { label: 'Total Users', value: stats.totalUsers, color: 'bg-blue-500', change: '+5.2%' },
    { label: 'Revenue', value: stats.revenue, color: 'bg-green-500', change: '+8.1%' },
    { label: 'Orders', value: stats.orders, color: 'bg-purple-500', change: '+12.5%' },
    { label: 'Growth', value: stats.growth, color: 'bg-orange-500', change: 'MTD' },
  ];

  return (
    <div 
      onClick={onSelect}
      className={`grid grid-cols-2 gap-4 h-full cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500 rounded-lg' : ''
      }`}
    >
      {cards.map((card, idx) => (
        <div key={idx} className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow">
          <div className={`${card.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
            <LayoutGrid className="w-5 h-5 text-white" />
          </div>
          <p className="text-sm text-gray-600 mb-1">{card.label}</p>
          <p className="text-2xl font-bold text-gray-800 mb-1">{card.value}</p>
          <p className="text-xs text-green-600 font-medium">{card.change}</p>
        </div>
      ))}
    </div>
  );
};

const Canvas = ({ components, onDrop, onSelectComponent, selectedId }) => {
  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('componentType');
    if (type) {
      onDrop(type);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div 
      className="flex-1 bg-gray-100 p-6 overflow-auto"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="max-w-7xl mx-auto space-y-4">
        {components.length === 0 ? (
          <div className="h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LayoutGrid className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Drop components here to start building</p>
              <p className="text-sm text-gray-400 mt-1">Drag from the left panel</p>
            </div>
          </div>
        ) : (
          components.map((comp) => (
            <div 
              key={comp.id}
              className={`relative ${comp.type === 'table' ? 'h-64' : 'h-48'}`}
            >
              {comp.type === 'table' && (
                <TableComponent 
                  data={DUMMY_DATA.users}
                  onSelect={() => onSelectComponent(comp.id)}
                  isSelected={selectedId === comp.id}
                />
              )}
              {comp.type === 'card' && (
                <CardComponent 
                  stats={DUMMY_DATA.stats}
                  onSelect={() => onSelectComponent(comp.id)}
                  isSelected={selectedId === comp.id}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const PropertyPanel = ({ selectedComponent, onDelete, onUpdateProps }) => {
  if (!selectedComponent) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-6">
        <div className="flex items-center gap-2 text-gray-400">
          <Settings className="w-5 h-5" />
          <h2 className="font-semibold">Properties</h2>
        </div>
        <p className="text-sm text-gray-500 mt-4">Select a component to edit properties</p>
      </div>
    );
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-700" />
          <h2 className="font-semibold text-gray-800">Properties</h2>
        </div>
        <button
          onClick={onDelete}
          className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-900">Component Type</p>
          <p className="text-lg font-semibold text-blue-700 capitalize mt-1">
            {selectedComponent.type}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Component ID
          </label>
          <input 
            type="text" 
            value={selectedComponent.id}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 text-sm"
          />
        </div>

        {selectedComponent.type === 'table' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Source
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Users API</option>
                <option>Products API</option>
                <option>Orders API</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rows to Display
              </label>
              <input 
                type="number" 
                defaultValue="10"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        )}

        {selectedComponent.type === 'card' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Layout
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>2x2 Grid</option>
                <option>1x4 Row</option>
                <option>4x1 Column</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Animation
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Fade In</option>
                <option>Slide Up</option>
                <option>None</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function DashboardBuilder() {
  const [components, setComponents] = useState([
    { id: 'table_1', type: 'table', props: {} },
    { id: 'card_1', type: 'card', props: {} },
  ]);
  const [selectedId, setSelectedId] = useState(null);
  const [previewMode, setPreviewMode] = useState(false);

  const handleDragStart = (e, type) => {
    e.dataTransfer.setData('componentType', type);
  };

  const handleDrop = (type) => {
    const newComponent = {
      id: `${type}_${Date.now()}`,
      type,
      props: {},
    };
    setComponents([...components, newComponent]);
  };

  const handleSelectComponent = (id) => {
    setSelectedId(id);
  };

  const handleDeleteComponent = () => {
    setComponents(components.filter(c => c.id !== selectedId));
    setSelectedId(null);
  };

  const selectedComponent = components.find(c => c.id === selectedId);

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-lg font-bold text-sm">
            UnifyApps
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Dashboard Builder</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            <Eye className="w-4 h-4" />
            {previewMode ? 'Edit' : 'Preview'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {!previewMode && (
          <ComponentPalette onDragStart={handleDragStart} />
        )}
        <Canvas 
          components={components}
          onDrop={handleDrop}
          onSelectComponent={handleSelectComponent}
          selectedId={selectedId}
        />
        {!previewMode && (
          <PropertyPanel 
            selectedComponent={selectedComponent}
            onDelete={handleDeleteComponent}
          />
        )}
      </div>
    </div>
  );
}