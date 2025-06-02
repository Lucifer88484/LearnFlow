/**
 * Firebase Status Component
 * Displays Firebase configuration and connection status for debugging
 */

import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Settings } from 'lucide-react';
import { getFirebaseConfigSummary, testFirebaseConfiguration } from '../../utils/firebaseTest';
import Card from './Card';
import Button from './Button';

/**
 * Firebase status indicator component
 * @param {Object} props - Component props
 * @param {boolean} props.showDetails - Whether to show detailed information
 */
const FirebaseStatus = ({ showDetails = false }) => {
  const [status, setStatus] = useState(null);
  const [testResults, setTestResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(showDetails);

  /**
   * Load Firebase status
   */
  useEffect(() => {
    const loadStatus = () => {
      try {
        const summary = getFirebaseConfigSummary();
        setStatus(summary);
      } catch (error) {
        console.error('Error loading Firebase status:', error);
        setStatus({ error: error.message });
      }
    };

    loadStatus();
  }, []);

  /**
   * Run Firebase tests
   */
  const runTests = async () => {
    setLoading(true);
    try {
      const results = await testFirebaseConfiguration();
      setTestResults(results);
    } catch (error) {
      console.error('Error running Firebase tests:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get status icon based on Firebase health
   */
  const getStatusIcon = () => {
    if (!status) return <AlertCircle className="h-4 w-4 text-gray-400" />;
    
    if (status.error) {
      return <XCircle className="h-4 w-4 text-error-600" />;
    }
    
    const allServicesUp = Object.values(status.servicesInitialized || {}).every(Boolean);
    
    if (allServicesUp && status.isValid) {
      return <CheckCircle className="h-4 w-4 text-success-600" />;
    }
    
    return <AlertCircle className="h-4 w-4 text-warning-600" />;
  };

  /**
   * Get status text
   */
  const getStatusText = () => {
    if (!status) return 'Loading...';
    if (status.error) return 'Error';
    
    const allServicesUp = Object.values(status.servicesInitialized || {}).every(Boolean);
    
    if (allServicesUp && status.isValid) {
      return 'Connected';
    }
    
    return 'Issues Detected';
  };

  if (!expanded) {
    return (
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <span className="text-sm text-gray-600">Firebase: {getStatusText()}</span>
        <button
          onClick={() => setExpanded(true)}
          className="text-xs text-blue-600 hover:text-blue-700"
        >
          Details
        </button>
      </div>
    );
  }

  return (
    <Card className="mb-4">
      <Card.Header className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <Card.Title className="text-base">Firebase Status</Card.Title>
          {getStatusIcon()}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(false)}
        >
          Hide
        </Button>
      </Card.Header>

      <Card.Content>
        {status && (
          <div className="space-y-4">
            {/* Basic Status */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Environment:</span> {status.environment}
              </div>
              <div>
                <span className="font-medium">Project ID:</span> {status.projectId || 'Not set'}
              </div>
              <div>
                <span className="font-medium">Auth Domain:</span> {status.authDomain || 'Not set'}
              </div>
              <div>
                <span className="font-medium">Emulators:</span> {status.emulatorsEnabled ? 'Enabled' : 'Disabled'}
              </div>
            </div>

            {/* Services Status */}
            <div>
              <h4 className="font-medium mb-2">Services Status:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(status.servicesInitialized || {}).map(([service, isUp]) => (
                  <div key={service} className="flex items-center space-x-2">
                    {isUp ? (
                      <CheckCircle className="h-3 w-3 text-success-600" />
                    ) : (
                      <XCircle className="h-3 w-3 text-error-600" />
                    )}
                    <span className="capitalize">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Issues */}
            {status.issues && status.issues.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 text-warning-700">Configuration Issues:</h4>
                <ul className="text-sm text-warning-600 space-y-1">
                  {status.issues.map((issue, index) => (
                    <li key={index}>• Missing: {issue}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Test Results */}
            {testResults && (
              <div>
                <h4 className="font-medium mb-2">Test Results:</h4>
                <div className="space-y-2">
                  {testResults.tests.map((test, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      {test.status === 'pass' && <CheckCircle className="h-3 w-3 text-success-600" />}
                      {test.status === 'fail' && <XCircle className="h-3 w-3 text-error-600" />}
                      {test.status === 'info' && <AlertCircle className="h-3 w-3 text-blue-600" />}
                      <span>{test.name}: {test.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2 pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={runTests}
                loading={loading}
                disabled={loading}
              >
                Run Tests
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.reload()}
              >
                Reload App
              </Button>
            </div>
          </div>
        )}

        {status?.error && (
          <div className="text-error-600 text-sm">
            <strong>Error:</strong> {status.error}
          </div>
        )}
      </Card.Content>
    </Card>
  );
};

export default FirebaseStatus;
