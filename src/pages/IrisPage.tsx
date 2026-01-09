import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

const IrisPage: React.FC = () => {
    return (
        <DashboardLayout>
            <h2>Iris Companion</h2>
            <div className="card mt-4 flex-center flex-col">
                <div style={{ fontSize: '4rem' }}>🧚‍♀️</div>
                <p>Status: Happy</p>
                <button className="btn-secondary mt-4">Customize</button>
            </div>
        </DashboardLayout>
    );
}

export default IrisPage;
