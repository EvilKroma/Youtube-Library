import React from 'react'; // Import React library to use their functionalities
import './App.css'; // Import App's css
import VideoList from './components/VideoList'; // Impor VideoList component for the back-end of the app

const App: React.FC = () => { // Define main coponent as react compnent function 
    return (
        <div className="App"> {/* CSS class for the div */}
            <header className="App-header"> {/* Same for the header */}
                <h1>Youtube Library</h1> {/* Display app's title */}
            </header>
            <VideoList /> {/* Import VideoList */}
        </div>
    );
};

export default App; 
