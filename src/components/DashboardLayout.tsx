// src/components/DashboardLayout.tsx
import React from 'react';
import { Outlet, useLocation, NavLink } from 'react-router-dom';
import { Activity, AlertTriangle, RefreshCw, FileText, Users, Settings } from 'lucide-react';

const DashboardLayout: React.FC = () => {
    const location = useLocation();
    
    // Funktion zur Ermittlung des aktuellen Seitennamens
    const getPageTitle = () => {
        switch (location.pathname) {
            case '/':
                return 'Dashboard';
            case '/active-incidents':
                return 'Aktive Vorfälle';
            case '/response':
                return 'Incident Response';
            case '/documentation':
                return 'Dokumentation';
            case '/team':
                return 'Team & Kontakte';
            case '/settings':
                return 'Einstellungen';
            default:
                return 'CIRP Dashboard';
        }
    };

    // Styling für das gesamte Layout
    const containerStyle: React.CSSProperties = {
        display: 'flex',
        height: '100vh',
        backgroundColor: '#f0f9ff', // Heller blauer Hintergrund für die gesamte App
    };
    
    // Styling für die Seitenleiste
    const sidebarStyle: React.CSSProperties = {
        width: '250px',
        backgroundColor: '#1e40af', // Dunkelblauer Hintergrund für die Seitenleiste
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)'
    };
    
    // Styling für den Seitenleisten-Header
    const sidebarHeaderStyle: React.CSSProperties = {
        padding: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.2)'
    };
    
    // Styling für den Hauptinhaltsbereich
    const contentStyle: React.CSSProperties = {
        flex: 1,
        padding: '24px',
        overflowY: 'auto',
        backgroundColor: '#f0f7ff' // Heller blauer Hintergrund für den Inhalt
    };
    
    // Styling für den Seitentitel
    const pageTitleStyle: React.CSSProperties = {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1e3a8a',
        marginBottom: '24px'
    };

    return (
        <div style={containerStyle}>
            <div style={sidebarStyle}>
                <div style={sidebarHeaderStyle}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>CIRP Dashboard</h2>
                </div>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '20px' }}>
                    <li style={{ marginBottom: '10px' }}>
                        <NavLink 
                            to="/" 
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: isActive ? '#2563eb' : 'transparent',
                                padding: '8px',
                                borderRadius: '4px'
                            })}
                        >
                            <Activity size={16} style={{ marginRight: '8px' }} />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <NavLink 
                            to="/active-incidents" 
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: isActive ? '#2563eb' : 'transparent',
                                padding: '8px',
                                borderRadius: '4px'
                            })}
                        >
                            <AlertTriangle size={16} style={{ marginRight: '8px' }} />
                            <span>Aktive Vorfälle</span>
                        </NavLink>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <NavLink 
                            to="/response" 
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: isActive ? '#2563eb' : 'transparent',
                                padding: '8px',
                                borderRadius: '4px'
                            })}
                        >
                            <RefreshCw size={16} style={{ marginRight: '8px' }} />
                            <span>Incident Response</span>
                        </NavLink>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <NavLink 
                            to="/documentation" 
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: isActive ? '#2563eb' : 'transparent',
                                padding: '8px',
                                borderRadius: '4px'
                            })}
                        >
                            <FileText size={16} style={{ marginRight: '8px' }} />
                            <span>Dokumentation</span>
                        </NavLink>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <NavLink 
                            to="/team" 
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: isActive ? '#2563eb' : 'transparent',
                                padding: '8px',
                                borderRadius: '4px'
                            })}
                        >
                            <Users size={16} style={{ marginRight: '8px' }} />
                            <span>Team & Kontakte</span>
                        </NavLink>
                    </li>
                    <li style={{ marginBottom: '10px' }}>
                        <NavLink 
                            to="/settings" 
                            style={({ isActive }) => ({
                                display: 'flex',
                                alignItems: 'center',
                                color: 'white',
                                textDecoration: 'none',
                                backgroundColor: isActive ? '#2563eb' : 'transparent',
                                padding: '8px',
                                borderRadius: '4px'
                            })}
                        >
                            <Settings size={16} style={{ marginRight: '8px' }} />
                            <span>Einstellungen</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div style={contentStyle}>
                <h1 style={pageTitleStyle}>{getPageTitle()}</h1>
                <Outlet />
            </div>
        </div>
    );
};

export default DashboardLayout;