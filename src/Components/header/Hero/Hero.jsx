import './Hero.css';
import fleche from '../../assets/fleche.png';
import play from '../../assets/play.png';
import pause from '../../assets/pause.png';

const Hero = ({ heroData, setHeroCount, heroCount, playStatus, setPlayStatus, onNextHero }) => { // Ajout de setPlayStatus et onNextHero
    return (
        <div className='hero'>
            <div className='hero-text'>
                <p>{heroData.text1}</p>
                <p>{heroData.text2}</p>
            </div>
            <div className='hero-explore'>
                <p>event of the weak</p>
                <img src={fleche} alt="" style={{ width: '40px', height: '50px' }} onClick={onNextHero} /> {/* Ajout du onClick */}
            </div>
            <div className='hero-dot-play'>
                <ul className='hero-dots'>
                    <li onClick={() => setHeroCount(0)} className={heroCount === 0 ? "hero-dot orange" : "hero-dot"}></li>
                    <li onClick={() => setHeroCount(1)} className={heroCount === 1 ? "hero-dot orange" : "hero-dot"}></li>
                    <li onClick={() => setHeroCount(2)} className={heroCount === 2 ? "hero-dot orange" : "hero-dot"}></li>
                </ul>
            </div>
            <div className="hero-play">
                <img
                    onClick={() => setPlayStatus(!playStatus)} // Utilisation de setPlayStatus
                    src={playStatus ? pause : play} // Changement de l'ordre des images pour plus de logique
                    alt=""
                    style={{ width: '60px', height: '60px' }} // Style simplifié
                />
                <p>see the video</p>
            </div>
        </div>
    );
};

export default Hero;