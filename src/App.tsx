import React from 'react';
import './App.css';
import VideoList from './components/VideoList';

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Youtube Library</h1>
            </header>
            <VideoList />
        </div>
    );
};

export default App;
