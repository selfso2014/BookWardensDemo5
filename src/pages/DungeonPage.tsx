import React from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';

const DungeonPage: React.FC = () => {
    return (
        <DashboardLayout>
            <h2>Book Atlas</h2>
            <div className="card mt-4">
                <p>Select a book to explore...</p>
                {/* Mock List */}
                {[1, 2, 3].map(i => (
                    <div key={i} style={{ padding: '1rem', borderBottom: '1px solid #eee' }}>
                        Book {i}: The Lost Chapter
                    </div>
                ))}
            </div>
        </DashboardLayout>
    );
}

export default DungeonPage;
