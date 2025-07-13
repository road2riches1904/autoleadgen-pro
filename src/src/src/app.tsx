import React, { useState, useEffect } from 'react'

// Mock data for demo
const mockLeads = [
  { id: 1, name: "TechStart Inc", email: "contact@techstart.com", industry: "Technology", score: 95, status: "Hot", value: "$5,000" },
  { id: 2, name: "GrowthCorp", email: "sales@growthcorp.com", industry: "Marketing", score: 88, status: "Warm", value: "$3,200" },
  { id: 3, name: "InnovateLabs", email: "hello@innovatelabs.com", industry: "Software", score: 92, status: "Hot", value: "$7,500" },
  { id: 4, name: "NextGen Solutions", email: "info@nextgen.com", industry: "Consulting", score: 76, status: "Cold", value: "$2,100" },
  { id: 5, name: "Digital Dynamics", email: "team@digitaldynamics.com", industry: "E-commerce", score: 85, status: "Warm", value: "$4,800" }
]

const mockClients = [
  { id: 1, name: "Local Dental Practice", plan: "Starter", mrr: 500, leads: 45, conversion: "12%" },
  { id: 2, name: "Real Estate Agency", plan: "Growth", mrr: 1200, leads: 120, conversion: "8%" },
  { id: 3, name: "Marketing Consultancy", plan: "Pro", mrr: 2500, leads: 280, conversion: "15%" }
]

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [leads, setLeads] = useState(mockLeads)
  const [clients, setClients] = useState(mockClients)
  const [isGenerating, setIsGenerating] = useState(false)
  const [totalRevenue, setTotalRevenue] = useState(4200)
  const [conversionRate, setConversionRate] = useState(12.5)

  const generateLeads = async () => {
    setIsGenerating(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const newLeads = [
      { id: leads.length + 1, name: "BuildCorp", email: "contact@buildcorp.com", industry: "Construction", score: 89, status: "Warm", value: "$6,200" },
      { id: leads.length + 2, name: "HealthTech Pro", email: "sales@healthtech.com", industry: "Healthcare", score: 94, status: "Hot", value: "$8,100" }
    ]
    
    setLeads([...newLeads, ...leads])
    setIsGenerating(false)
    alert('🎉 2 new high-quality leads generated!')
  }

  const totalMRR = clients.reduce((sum, client) => sum + client.mrr, 0)
  const totalLeadsGenerated = leads.length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="gradient-bg text-white p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">AutoLeadGen Pro</h1>
          <p className="text-blue-100">Your Automated Lead Generation & Revenue Platform</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex space-x-8">
            {['dashboard', 'leads', 'clients', 'analytics', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {activeTab === 'dashboard' && (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Revenue Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-700">Monthly Revenue</h3>
                  <p className="text-3xl font-bold text-green-600">${totalMRR.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">+23% this month</p>
                </div>
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-700">Total Leads</h3>
                  <p className="text-3xl font-bold text-blue-600">{totalLeadsGenerated}</p>
                  <p className="text-sm text-gray-500">+{Math.floor(totalLeadsGenerated * 0.15)} this week</p>
                </div>
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-700">Conversion Rate</h3>
                  <p className="text-3xl font-bold text-purple-600">{conversionRate}%</p>
                  <p className="text-sm text-gray-500">+2.1% improvement</p>
                </div>
                <div className="card">
                  <h3 className="text-lg font-semibold text-gray-700">Active Clients</h3>
                  <p className="text-3xl font-bold text-orange-600">{clients.length}</p>
                  <p className="text-sm text-gray-500">All paying clients</p>
                </div>
              </div>
            </div>

            <div className="card">
              <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={generateLeads} 
                  disabled={isGenerating}
                  className={`btn btn-primary ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isGenerating ? 'Generating...' : '🚀 Generate New Leads'}
                </button>
                <button className="btn btn-success">💰 View Revenue Report</button>
                <button className="btn" style={{background: '#8b5cf6', color: 'white'}}>🎯 Find New Prospects</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'leads' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Lead Pipeline</h2>
              <button onClick={generateLeads} className="btn btn-primary">
                {isGenerating ? 'Generating...' : '+ Generate Leads'}
              </button>
            </div>
            <div className="card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Company</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Industry</th>
                      <th className="text-left py-3 px-4">Score</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Est. Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => (
                      <tr key={lead.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{lead.name}</td>
                        <td className="py-3 px-4 text-gray-600">{lead.email}</td>
                        <td className="py-3 px-4">{lead.industry}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            lead.score >= 90 ? 'bg-green-100 text-green-800' :
                            lead.score >= 80 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {lead.score}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded text-sm ${
                            lead.status === 'Hot' ? 'bg-red-100 text-red-800' :
                            lead.status === 'Warm' ? 'bg-orange-100 text-orange-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-bold text-green-600">{lead.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Client Management</h2>
            <div className="grid gap-6">
              {clients.map((client) => (
                <div key={client.id} className="card">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold">{client.name}</h3>
                      <p className="text-gray-600">{client.plan} Plan</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">${client.mrr}/mo</p>
                      <p className="text-sm text-gray-500">{client.leads} leads • {client.conversion} conversion</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="card mt-6">
              <h3 className="text-lg font-bold mb-4">Add New Client</h3>
              <button className="btn btn-primary">+ Onboard New Client</button>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Revenue Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-bold mb-4">Revenue Growth</h3>
                <div className="h-48 bg-gradient-to-r from-blue-100 to-purple-100 rounded flex items-center justify-center">
                  <p className="text-2xl font-bold text-blue-600">📈 +127% Growth</p>
                </div>
              </div>
              <div className="card">
                <h3 className="text-lg font-bold mb-4">Lead Quality Score</h3>
                <div className="h-48 bg-gradient-to-r from-green-100 to-blue-100 rounded flex items-center justify-center">
                  <p className="text-2xl font-bold text-green-600">⭐ 4.8/5.0</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Platform Settings</h2>
            <div className="card">
              <h3 className="text-lg font-bold mb-4">Demo Mode Active</h3>
              <p className="text-gray-600 mb-4">
                Your platform is running in demo mode. Upgrade to production to access real lead generation APIs.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold">Next Steps:</h4>
                  <ul className="list-disc list-inside text-gray-600 mt-2">
                    <li>Sign up for Supabase (free database)</li>
                    <li>Get Apollo.io API key (10,000 free credits)</li>
                    <li>Configure Stripe for payments</li>
                    <li>Set up SendGrid for email automation</li>
                  </ul>
                </div>
                <button className="btn btn-primary">Upgrade to Production</button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 AutoLeadGen Pro - Your Revenue Generation Platform</p>
        </div>
      </footer>
    </div>
  )
}

export default App
