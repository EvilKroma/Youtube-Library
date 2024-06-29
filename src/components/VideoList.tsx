import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'; // Assurez-vous que le chemin vers votre fichier CSS est correct

interface Video {
    id: { videoId: string };
    snippet: { title: string; thumbnails: { default: { url: string } } };
}

const apiKey = "AIzaSyDNZclk4gyX-z3Ii_lEj7FbqWhKiXx6-VY"; // API key
const channelId = "UCWeg2Pkate69NFdBeuRFTAw"; // channel ID of squeezie channel for the 2 firts videos in the list
const initialApiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=2`; // URL called

const VideoList: React.FC = () => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Video[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(initialApiUrl)
            .then((response) => {
                setVideos(response.data.items);
            })
            .catch((error) => {
                setError(error.message);
            });
    }, []);

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

    const handleAddVideo = (video: Video) => {
        setVideos(prevVideos => [...prevVideos, video]);
        setSearchResults([]);
        setSearchTerm('');
    };

    const handleRemoveVideo = (videoId: string) => {
        const updatedVideos = videos.filter(video => video.id.videoId !== videoId);
        setVideos(updatedVideos);
    };

    const handleVideoClick = (videoId: string) => {
        console.log(`Video clicked: ${videoId}`); 
        setSelectedVideo(videoId);
    };

    return (
        <div className="app-container">
            <div className="video-list-container">
                {error && <p>Erreur: {error}</p>}
                <form onSubmit={handleSearch}>
                    <input id="button"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher des vidéos"
                    />
                    <button id="button" type="submit">Rechercher</button>
                </form>
                <div className="video-list">
                    {searchResults.map((video) => (
                        <div key={video.id.videoId} className="video-container" onClick={() => handleAddVideo(video)}>
                            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
                            <h3>{video.snippet.title}</h3>
                        </div>
                    ))}
                </div>
                <br />
                <br />
                <div className="added-videos">
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
            <div className="video-player">
                {selectedVideo && (
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${selectedVideo}`} // Embedded video on thr right on click
                        frameBorder="0"
                        allowFullScreen // Allows the embedded video to be in fullscreen
                        title="YouTube Video Player"
                    ></iframe>
                )}
            </div>
        </div>
    );
};

export default VideoList;
