import React, { useState, useEffect } from 'react';
import { 
  Plus, ChevronRight, Code, Database, Settings, 
  Play, Share2, Eye, Upload, X, GripVertical,
  Edit2, Trash2, Calendar, DollarSign, User,
  CreditCard, FileText, Download, Filter, Search,
  ChevronDown, Menu, Sparkles
} from 'lucide-react';

// Mock Data
const MOCK_APPLICATIONS = [
  {
    id: 'APP001',
    borrowerName: 'Sarah Johnson',
    gender: 'Female',
    dob: '1985-03-15',
    address: '123 Main St, San Francisco, CA 94102',
    creditProduct: 'Personal Loan',
    loanAmount: 25000,
    term: 36,
    repaymentPeriod: 'Monthly',
    status: 'Under Review',
    creditScore: 720,
    loanPurpose: 'Home Improvement',
    appliedDate: '2024-01-15',
    idProof: null
  },
  {
    id: 'APP002',
    borrowerName: 'Michael Chen',
    gender: 'Male',
    dob: '1990-07-22',
    address: '456 Oak Ave, New York, NY 10001',
    creditProduct: 'Business Loan',
    loanAmount: 150000,
    term: 60,
    repaymentPeriod: 'Monthly',
    status: 'Approved',
    creditScore: 785,
    loanPurpose: 'Business Expansion',
    appliedDate: '2024-01-10',
    idProof: null
  },
  {
    id: 'APP003',
    borrowerName: 'Emily Rodriguez',
    gender: 'Female',
    dob: '1988-11-30',
    address: '789 Pine Rd, Austin, TX 78701',
    creditProduct: 'Auto Loan',
    loanAmount: 35000,
    term: 48,
    repaymentPeriod: 'Monthly',
    status: 'Rejected',
    creditScore: 650,
    loanPurpose: 'Vehicle Purchase',
    appliedDate: '2024-01-12',
    idProof: null
  },
  {
    id: 'APP004',
    borrowerName: 'James Wilson',
    gender: 'Male',
    dob: '1982-05-08',
    address: '321 Elm St, Seattle, WA 98101',
    creditProduct: 'Mortgage',
    loanAmount: 450000,
    term: 360,
    repaymentPeriod: 'Monthly',
    status: 'Under Review',
    creditScore: 740,
    loanPurpose: 'Home Purchase',
    appliedDate: '2024-01-18',
    idProof: null
  },
  {
    id: 'APP005',
    borrowerName: 'Lisa Anderson',
    gender: 'Female',
    dob: '1995-09-14',
    address: '654 Maple Dr, Boston, MA 02101',
    creditProduct: 'Personal Loan',
    loanAmount: 15000,
    term: 24,
    repaymentPeriod: 'Monthly',
    status: 'Approved',
    creditScore: 695,
    loanPurpose: 'Debt Consolidation',
    appliedDate: '2024-01-20',
    idProof: null
  }
];

// Generate AI recommendation based on application data
const generateAIRecommendation = (app) => {
  if (!app) return null;
  
  const score = app.creditScore;
  const amount = app.loanAmount;
  
  if (score >= 750) {
    return {
      decision: 'Strong Approval',
      confidence: 95,
      reasoning: `Excellent credit score of ${score} indicates very low risk. Applicant shows strong financial responsibility and payment history.`,
      recommendations: [
        'Consider offering premium rate (APR 4.5-6%)',
        'Pre-approve for additional credit line',
        'Fast-track application process'
      ]
    };
  } else if (score >= 700) {
    return {
      decision: 'Approve with Standard Terms',
      confidence: 85,
      reasoning: `Good credit score of ${score} suggests reliable borrower. Standard risk assessment applies.`,
      recommendations: [
        'Standard interest rate (APR 7-9%)',
        'Require standard documentation',
        'Normal processing timeline'
      ]
    };
  } else if (score >= 650) {
    return {
      decision: 'Conditional Approval',
      confidence: 65,
      reasoning: `Fair credit score of ${score}. Recommend additional verification and higher interest rate to mitigate risk.`,
      recommendations: [
        'Higher interest rate (APR 10-12%)',
        'Require co-signer or additional collateral',
        'Reduce loan amount by 15-20%'
      ]
    };
  } else {
    return {
      decision: 'Recommend Rejection',
      confidence: 75,
      reasoning: `Credit score of ${score} indicates elevated risk. High probability of default based on historical data.`,
      recommendations: [
        'Suggest credit improvement program',
        'Offer secured loan alternative',
        'Re-evaluate after 6 months'
      ]
    };
  }
};

// Draggable Widget Component
const DraggableWidget = ({ id, type, title, children, onRemove }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('widgetId', id);
        setIsDragging(true);
      }}
      onDragEnd={() => setIsDragging(false)}
      className={`bg-white rounded-lg border-2 border-gray-200 p-4 transition-all ${
        isDragging ? 'opacity-50 scale-95' : 'hover:border-purple-300'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
          <span className="font-semibold text-gray-800">{title}</span>
        </div>
        <button
          onClick={() => onRemove(id)}
          className="p-1 hover:bg-red-50 rounded text-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
      {children}
    </div>
  );
};

// Main App Component
const NoCodeDashboard = () => {
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [selectedApp, setSelectedApp] = useState(MOCK_APPLICATIONS[0]);
  const [showNewAppModal, setShowNewAppModal] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [widgets, setWidgets] = useState([
    { id: 'w1', type: 'chart', title: 'Loan Distribution' },
    { id: 'w2', type: 'stats', title: 'Key Metrics' }
  ]);
  
  // New Application Form State
  const [formData, setFormData] = useState({
    borrowerName: '',
    gender: '',
    dob: '',
    address: '',
    creditProduct: '',
    loanAmount: '',
    term: '',
    repaymentPeriod: 'Monthly',
    idProof: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  // AI Recommendation
  const aiRecommendation = generateAIRecommendation(selectedApp);

  // Filtered applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.borrowerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Handle image upload
  const handleImageUpload = (file) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, idProof: file });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newApp = {
      id: `APP${String(applications.length + 1).padStart(3, '0')}`,
      ...formData,
      loanAmount: parseFloat(formData.loanAmount),
      term: parseInt(formData.term),
      status: 'Under Review',
      creditScore: Math.floor(Math.random() * (800 - 600) + 600),
      loanPurpose: 'Not Specified',
      appliedDate: new Date().toISOString().split('T')[0]
    };
    
    setApplications([newApp, ...applications]);
    setSelectedApp(newApp);
    setShowNewAppModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      borrowerName: '',
      gender: '',
      dob: '',
      address: '',
      creditProduct: '',
      loanAmount: '',
      term: '',
      repaymentPeriod: 'Monthly',
      idProof: null
    });
    setImagePreview(null);
  };

  const addWidget = (type) => {
    const newWidget = {
      id: `w${Date.now()}`,
      type,
      title: type === 'chart' ? 'New Chart' : 'New Stats'
    };
    setWidgets([...widgets, newWidget]);
  };

  const removeWidget = (id) => {
    setWidgets(widgets.filter(w => w.id !== id));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              LA
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-sm lg:text-base">Loan Applications</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Production</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Eye className="w-4 h-4" />
            <span className="hidden md:inline">Preview</span>
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            <Play className="w-4 h-4" />
            <span className="hidden md:inline">Deploy</span>
          </button>
          <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition">
            <Share2 className="w-4 h-4" />
            <span className="hidden md:inline">Share</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className={`${
          sidebarCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-16' : 'w-64'
        } lg:relative absolute z-30 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 h-full`}>
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            <SidebarItem icon={FileText} label="Pages" active />
            <SidebarItem icon={Code} label="UI" />
            <SidebarItem icon={Database} label="Queries" />
            <SidebarItem icon={Settings} label="Settings" />
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Center Canvas */}
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
            <div className="max-w-7xl mx-auto space-y-4">
              {/* Controls Bar */}
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
                  <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none sm:w-64">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search applications..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option>All</option>
                      <option>Under Review</option>
                      <option>Approved</option>
                      <option>Rejected</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setShowNewAppModal(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                  >
                    <Plus className="w-4 h-4" />
                    New Application
                  </button>
                </div>
              </div>

              {/* Draggable Widgets Area */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {widgets.map(widget => (
                  <DraggableWidget
                    key={widget.id}
                    id={widget.id}
                    type={widget.type}
                    title={widget.title}
                    onRemove={removeWidget}
                  >
                    {widget.type === 'chart' ? (
                      <div className="h-48 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500 text-sm">Chart Widget</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-xs text-gray-600">Total Apps</p>
                          <p className="text-2xl font-bold text-blue-600">{applications.length}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <p className="text-xs text-gray-600">Approved</p>
                          <p className="text-2xl font-bold text-green-600">
                            {applications.filter(a => a.status === 'Approved').length}
                          </p>
                        </div>
                      </div>
                    )}
                  </DraggableWidget>
                ))}
              </div>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => addWidget('chart')}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  + Add Chart
                </button>
                <button
                  onClick={() => addWidget('stats')}
                  className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  + Add Stats
                </button>
              </div>

              {/* Applications Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Application ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Borrower Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                          Product
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredApplications.map((app) => (
                        <tr
                          key={app.id}
                          onClick={() => setSelectedApp(app)}
                          className={`cursor-pointer transition ${
                            selectedApp?.id === app.id
                              ? 'bg-purple-50'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            {app.id}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-700">
                            {app.borrowerName}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 hidden sm:table-cell">
                            {app.creditProduct}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600 hidden md:table-cell">
                            ${app.loanAmount.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              app.status === 'Approved'
                                ? 'bg-green-100 text-green-800'
                                : app.status === 'Rejected'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Right Properties Panel */}
          <aside className="w-full lg:w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Application Details</h3>
            </div>
            
            {selectedApp && (
              <div className="p-4 space-y-4">
                {/* Underwriting Data */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Underwriting Data
                  </h4>
                  <div className="space-y-2 text-sm">
                    <DataRow label="Application ID" value={selectedApp.id} />
                    <DataRow label="Status" value={selectedApp.status} />
                    <DataRow label="Credit Score" value={selectedApp.creditScore} />
                    <DataRow label="Loan Purpose" value={selectedApp.loanPurpose} />
                    <DataRow label="Loan Amount" value={`$${selectedApp.loanAmount.toLocaleString()}`} />
                    <DataRow label="Term" value={`${selectedApp.term} months`} />
                    <DataRow label="Applied Date" value={selectedApp.appliedDate} />
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Borrower Info</h4>
                  <div className="space-y-2 text-sm">
                    <DataRow label="Name" value={selectedApp.borrowerName} />
                    <DataRow label="Gender" value={selectedApp.gender} />
                    <DataRow label="DOB" value={selectedApp.dob} />
                    <DataRow label="Address" value={selectedApp.address} />
                  </div>
                </div>

                {/* AI Recommendation */}
                {aiRecommendation && (
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      AI Recommendation
                    </h4>
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 space-y-3">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Decision</p>
                        <p className="font-semibold text-purple-900">{aiRecommendation.decision}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Confidence</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-white rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-purple-600 h-full rounded-full transition-all"
                              style={{ width: `${aiRecommendation.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{aiRecommendation.confidence}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-2">Reasoning</p>
                        <p className="text-sm text-gray-700">{aiRecommendation.reasoning}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-2">Recommendations</p>
                        <ul className="space-y-1">
                          {aiRecommendation.recommendations.map((rec, idx) => (
                            <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                              <span className="text-purple-600 mt-0.5">•</span>
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </aside>
        </main>
      </div>

      {/* New Application Modal */}
      {showNewAppModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">New Loan Application</h2>
              <button
                onClick={() => {
                  setShowNewAppModal(false);
                  resetForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Borrower Information */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Borrower Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.borrowerName}
                      onChange={(e) => setFormData({ ...formData, borrowerName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter borrower name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender *
                    </label>
                    <select
                      required
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dob}
                      onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address *
                    </label>
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      rows="2"
                      placeholder="Enter complete address"
                    />
                  </div>
                </div>
              </div>

              {/* Loan Details */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Loan Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Credit Product *
                    </label>
                    <select
                      required
                      value={formData.creditProduct}
                      onChange={(e) => setFormData({ ...formData, creditProduct: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select Product</option>
                      <option>Personal Loan</option>
                      <option>Business Loan</option>
                      <option>Auto Loan</option>
                      <option>Mortgage</option>
                      <option>Home Equity</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Loan Amount ($) *
                    </label>
                    <input
                      type="number"
                      required
                      min="1000"
                      value={formData.loanAmount}
                      onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="25000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Term (months) *
                    </label>
                    <input
                      type="number"
                      required
                      min="6"
                      max="360"
                      value={formData.term}
                      onChange={(e) => setFormData({ ...formData, term: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="36"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Repayment Period *
                    </label>
                    <select
                      required
                      value={formData.repaymentPeriod}
                      onChange={(e) => setFormData({ ...formData, repaymentPeriod: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option>Monthly</option>
                      <option>Quarterly</option>
                      <option>Semi-Annual</option>
                      <option>Annual</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ID Proof Upload */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Identity Verification</h3>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDragOver(false);
                    const file = e.dataTransfer.files[0];
                    handleImageUpload(file);
                  }}
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition ${
                    dragOver ? 'border-purple-500 bg-purple-50' : 'border-gray-300'
                  }`}
                >
                  {imagePreview ? (
                    <div className="space-y-3">
                      <img
                        src={imagePreview}
                        alt="ID Proof"
                        className="max-h-48 mx-auto rounded-lg"
                      />
                      <div className="flex justify-center gap-2">
                        <label className="cursor-pointer px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                          Replace
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files[0])}
                            className="hidden"
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setImagePreview(null);
                            setFormData({ ...formData, idProof: null });
                          }}
                          className="px-3 py-1.5 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Upload className="w-12 h-12 mx-auto text-gray-400" />
                      <div>
                        <label className="cursor-pointer text-purple-600 hover:text-purple-700 font-medium">
                          Click to upload
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageUpload(e.target.files[0])}
                            className="hidden"
                          />
                        </label>
                        <span className="text-gray-500"> or drag and drop</span>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewAppModal(false);
                    resetForm();
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Components
const SidebarItem = ({ icon: Icon, label, active }) => (
  <button
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition ${
      active
        ? 'bg-purple-50 text-purple-600'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
  >
    <Icon className="w-5 h-5" />
    <span className="text-sm font-medium">{label}</span>
  </button>
);

const DataRow = ({ label, value }) => (
  <div className="flex justify-between items-start py-1">
    <span className="text-gray-600">{label}:</span>
    <span className="font-medium text-gray-900 text-right">{value}</span>
  </div>
);

export default NoCodeDashboard;