import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import '../styles/AnimePage.css';


interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: {
    image_url: string;
    small_image_url: string;
    medium_image_url: string;
    large_image_url: string;
    maximum_image_url: string;
  };
}


interface AnimeDescription{
    mal_id: number;
    title: string;
    rank: string;
    popularity: string;
    score: string;
    images:{
        jpg:{
            image_url: string;
        };
    };
    scored_by: string;
    members: string;
    synopsis: string;

    trailer: Trailer;

}

export default function AnimePage(){
   const {id} = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false);


    const [ anime, setAnime ] = useState<AnimeDescription | null>(null);
    const [loading, setIsLoading] = useState(true); 

    useEffect(()=>{
        const fetchAnime = async ()=> {
            try{
                setIsLoading(true);
                const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
                const content = await res.json();
                setAnime(content.data);
            }
            catch(err){
                console.error(`Fetch Failed :`, err);
            }
            finally{
                setIsLoading(false);
            }
        }

        fetchAnime();

    },[id]);

  if (loading) return <p>Loading...</p>;
  if (!anime) return <p>Anime not found.</p>;

    return(
            
            <div className="anime-page">
                <h2>{anime.title}</h2>
                <hr />
                <div className="main-container">
                    <div className="left-container">
                        <img src={anime.images.jpg.image_url} alt={anime.title} />
                    </div>
                    <div className="right-container">
                        <div className="top-row">
                            <div className="anime-stats">
                                <div className="anime-score">
                                    <span>SCORE</span>
                                    <span>{anime.score}</span>
                                    <span>{anime.scored_by.toLocaleString('en-US')} Users</span>   
                                </div>
                                <div className="anime-rank">
                                    <p><strong>Rank#</strong> {anime.rank}</p>
                                    <p><strong>Popularity#</strong> {anime.popularity}</p>
                                    
                                    <p><strong>Members:</strong> {anime.members.toLocaleString('en-US')}</p>
                                    
                                    
                                </div>              
                                    

                            </div>
                           
                        <div className="anime-trailer">
                            <img
                                src={anime.trailer.images.medium_image_url}
                                alt="Trailer Thumbnail"
                                onClick={() => setIsModalOpen(true)}
                                style={{ cursor: 'pointer', maxWidth: '100%', borderRadius: '8px' }}
                            />
                            {isModalOpen && (
                                    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
                                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                            <iframe
                                                width="800"
                                                height="450"
                                                src={anime.trailer.embed_url}
                                                title="YouTube Trailer"
                                                allowFullScreen
                                            />
                                            <button onClick={() => setIsModalOpen(false)} className="close-button">✖</button>
                                        </div>
                                    </div>
                                )}
                            </div> 
                        </div>
                        <div className="bottom-row">
                            <div className="plantowatch">
                                <button className="add">
                                    plan to watch
                                </button>
                            </div>
                            <div className="anime-synopsis">
                                <h3>Synopsis</h3>
                                <p>{anime.synopsis}</p>
                            </div>
                        </div>
                    </div>                              
                    
                    
                    
                </div>
            </div>
        
    )
}