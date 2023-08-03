import "./IntroHome.scss"
import DiceIntro from "../../assets/images/IntroIMG.png"

const IntroHome = () => {
  return (
    <div className="introContainer">
      <div className="introBody">
        <div className="introTitle">
          <h3>
            “<span className="introWordTitle">ROLE PLAY</span>ING GAME”
          </h3>
        </div>
        <div className="introDescription">
          <p className="pDescription">
            Discover the vastness of <span className="introWord">CHOICES</span>{" "}
            and dive into varied{" "}
            <span className="introWord">ENIGMA WORLDS</span>! Embody
            extraordinary characters and become the{" "}
            <span className="introWord">PROTAGONIST</span>, live{" "}
            <span className="introWord">EPIC</span> adventures and take part in
            <span className="introWord"> EXTRAORDINARY QUESTS</span>. Ready to
            live <span className="introWord">UNFORGETTABLE EXPERIENCES</span>?
          </p>
        </div>
      </div>
      <div className="introImg">
        <img src={DiceIntro} alt="dé 20 façes" className="DiceIntro1" />
        <img src={DiceIntro} alt="dé 20 façes" className="DiceIntro2" />
      </div>
    </div>
  )
}

export default IntroHome
