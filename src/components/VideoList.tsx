import React, { useEffect, useState } from 'react'; // useState is used to add a local state to a component
import axios from 'axios'; // Import axios library to make HTTP request (used with the YTB API)
import '../App.css'; 

interface Video { // Define the structure of a video object
    id: { videoId: string };
    snippet: { title: string; thumbnails: { default: { url: string } } };
}

const apiKey = "AIzaSyDNZclk4gyX-z3Ii_lEj7FbqWhKiXx6-VY"; // API key for Youtube's API 
const channelId = "UCWeg2Pkate69NFdBeuRFTAw"; // Channel ID of squeezie for the 2 first displayed video
const initialApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=2`; // URL with the API key and channel ID

const VideoList: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]); // State to store added videos
    const [searchTerm, setSearchTerm] = useState(''); // State to store term searched 
    const [searchResults, setSearchResults] = useState<Video[]>([]); // State to store result
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null); // State to store selected video
    const [error, setError] = useState<string | null>(null); // State to store errors messages

    // useEffect to retrieve the first videos in the chain when editing the component
    useEffect(() => {
        axios.get(initialApiUrl)
            .then((response) => {
                setVideos(response.data.items);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

    // Function to manage search form submission
    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${searchTerm}&part=snippet,id&maxResults=10`;
        axios.get(searchApiUrl)
            .then((response) => {
                setSearchResults(response.data.items);
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    // Function to add video to the list
    const handleAddVideo = (video: Video) => {
        setVideos(prevVideos => [...prevVideos, video]);
        setSearchResults([]); // Reset the result of the search
        setSearchTerm(''); // Reset the term of the search (in the search bar)
    };

    // Fonction to deletde video from the list
    const handleRemoveVideo = (videoId: string) => {
        const updatedVideos = videos.filter(video => video.id.videoId !== videoId);
        setVideos(updatedVideos);
    };

    // Fonction to manage the "onClick" on a video of the list
    const handleVideoClick = (videoId: string) => {
        console.log(`Video clicked: ${videoId}`);
        setSelectedVideo(videoId);
    };

    return (
        <div className="app-container"> {/* Main container of the app */}
            <div className="video-list-container"> {/* Container for the video list */}
                {error && <p>Erreur: {error}</p>} {/* Display error message if necessary */}
                <form onSubmit={handleSearch}> {/* Form to search videos */}
                    <input id="button"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher des vidéos"
                    />
                    <button id="button" type="submit">Rechercher</button>
                </form>
                <div className="video-list"> {/* List of results */}
                    {searchResults.map((video) => (
                        <div key={video.id.videoId} className="video-container" onClick={() => handleAddVideo(video)}>
                            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                            <h3>{video.snippet.title}</h3>
                        </div>
                    ))}
                </div>
                <br />
                <br />
                <div className="added-videos"> {/* List of added video */}
                    {videos.map((video) => (
                        <div key={video.id.videoId} className="added-video">
                            <img
                                src={video.snippet.thumbnails.default.url}
                                alt={video.snippet.title}
                                onClick={() => handleVideoClick(video.id.videoId)}
                            />
                            <h3>{video.snippet.title}</h3>
                            <button id="button" onClick={() => handleRemoveVideo(video.id.videoId)}>Supprimer</button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="video-player"> {/* COntainer for the embedded video */}
                {selectedVideo && (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${selectedVideo}`} // URL of the selected video (embedded)
                        frameBorder="0"
                        allowFullScreen // Allow the full screen mode of the embedded video 
                        title="YouTube Video Player"
                    ></iframe>
                )}
            </div>
        </div>
    );
};

export default VideoList; 
