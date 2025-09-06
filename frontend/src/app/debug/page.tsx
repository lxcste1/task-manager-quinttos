"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function DebugPage() {
  const [results, setResults] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const testEndpoint = async (endpoint: string, method = 'GET') => {
    setLoading(true);
    try {
      let response;
      switch (method) {
        case 'GET':
          response = await api.get(endpoint);
          break;
        default:
          response = await api.get(endpoint);
      }
      setResults(prev => ({
        ...prev,
        [endpoint]: { success: true, data: response.data, status: response.status }
      }));
    } catch (error: any) {
      setResults(prev => ({
        ...prev,
        [endpoint]: { 
          success: false, 
          error: error.message, 
          status: error.response?.status,
          data: error.response?.data 
        }
      }));
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>API Debug Page</h1>
      <p>Use this page to test your API endpoints</p>
      
      <div style={{ marginBottom: "1rem" }}>
        <button 
          onClick={() => testEndpoint('/health')}
          disabled={loading}
          style={{ marginRight: "0.5rem" }}
        >
          Test /health
        </button>
        
        <button 
          onClick={() => testEndpoint('/tasks')}
          disabled={loading}
          style={{ marginRight: "0.5rem" }}
        >
          Test /tasks
        </button>
        
        <button 
          onClick={() => testEndpoint('/stats')}
          disabled={loading}
          style={{ marginRight: "0.5rem" }}
        >
          Test /stats
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div style={{ marginTop: "2rem" }}>
        <h2>Results:</h2>
        <pre style={{ 
          background: "#f5f5f5", 
          padding: "1rem", 
          borderRadius: "4px",
          overflow: "auto",
          maxHeight: "400px"
        }}>
          {JSON.stringify(results, null, 2)}
        </pre>
      </div>
    </div>
  );
}
