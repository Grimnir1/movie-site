
import '../css/CastCard.css';


function CastCard({member}){
    return (
        <div className="cast-member">
            <img src={`https://image.tmdb.org/t/p/w500${member.profile_path}`} alt={member.name} className="cast-photo" />
            <div className="cast-info">
                <p className="cast-name">{member.name}</p>
                <p className="character-name">as {member.character}</p>
            </div>
        </div>
    )
}
export default CastCard
