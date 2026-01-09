import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/layout/DashboardLayout';
import { MOCK_BOOKS } from '../data/mockBooks';
import { useGameStore } from '../lib/store';
import { BookOpen, Map as MapIcon, ChevronRight, Lock } from 'lucide-react';

const DungeonPage: React.FC = () => {
    const navigate = useNavigate();
    const setSelectedContent = useGameStore((state) => state.setSelectedContent);
    const [expandedBook, setExpandedBook] = useState<string | null>(MOCK_BOOKS[0].id);

    const handleChapterSelect = (bookId: string, chapterId: string) => {
        setSelectedContent(bookId, chapterId);
        navigate('/run');
    };

    return (
        <DashboardLayout>
            <div style={{ padding: '0 1rem 5rem 1rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--c-text-main)' }}>
                        <MapIcon size={24} style={{ display: 'inline', marginRight: '8px', verticalAlign: '-4px' }} />
                        Book Atlas
                    </h2>
                    <p style={{ color: 'var(--c-text-sub)' }}>
                        Select a story to cleanse from the Rift.
                    </p>
                </div>

                <div className="book-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {MOCK_BOOKS.map(book => (
                        <div key={book.id} className="card" style={{ padding: 0, overflow: 'hidden', border: `1px solid ${book.coverColor}40` }}>
                            {/* Book Header */}
                            <div
                                onClick={() => setExpandedBook(expandedBook === book.id ? null : book.id)}
                                style={{
                                    padding: '1rem',
                                    background: `linear-gradient(to right, ${book.coverColor}20, transparent)`,
                                    display: 'flex', alignItems: 'center', gap: '1rem',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{
                                    width: 48, height: 64, backgroundColor: book.coverColor, borderRadius: '4px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', boxShadow: '2px 2px 5px rgba(0,0,0,0.2)'
                                }}>
                                    <BookOpen size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{book.title}</h3>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--c-text-sub)' }}>{book.author} • Lv. {book.level}</p>
                                </div>
                                <ChevronRight
                                    size={20}
                                    style={{
                                        transform: expandedBook === book.id ? 'rotate(90deg)' : 'rotate(0deg)',
                                        transition: 'transform 0.3s ease'
                                    }}
                                    color="var(--c-text-sub)"
                                />
                            </div>

                            {/* Chapter List (Accordion) */}
                            {expandedBook === book.id && (
                                <div style={{ borderTop: '1px solid #E5E7EB' }}>
                                    {book.chapters.map((chapter, idx) => (
                                        <div
                                            key={chapter.id}
                                            onClick={() => handleChapterSelect(book.id, chapter.id)}
                                            style={{
                                                padding: '1rem',
                                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                borderBottom: idx < book.chapters.length - 1 ? '1px solid #F3F4F6' : 'none',
                                                cursor: 'pointer',
                                                transition: 'background 0.2s'
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9FAFB'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                        >
                                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                <span style={{ fontWeight: 600, color: 'var(--c-text-main)' }}>
                                                    Chapter {idx + 1}: {chapter.title}
                                                </span>
                                                <span style={{ fontSize: '0.8rem', color: 'var(--c-text-sub)', marginTop: '2px' }}>
                                                    💧 {chapter.rewards.ink} Ink • ✨ {chapter.rewards.runes} Runes
                                                </span>
                                            </div>
                                            <div className="btn-secondary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }}>
                                                Play
                                            </div>
                                        </div>
                                    ))}
                                    {/* Locked Chapter Mock */}
                                    <div style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', opacity: 0.5, backgroundColor: '#F9FAFB' }}>
                                        <Lock size={16} />
                                        <span>Chapter 3: Coming Soon</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default DungeonPage;
