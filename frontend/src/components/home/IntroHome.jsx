import "./IntroHome.scss"
import DiceIntro from "../../assets/images/IntroIMG.png"

const IntroHome = () => {
  return (
    <div className="intro">
      <div className="intro__Body">
        <div className="intro__Title">
          <h3 className="inGame">
            “<span className="intro__WordTitle">ROLE PLAY</span>ING GAME”
          </h3>
        </div>
        <div className="intro__Description">
          <p className="intro__pDescription">
            Discover the vastness of{" "}
            <span className="intro__Word">CHOICES</span> and dive into varied{" "}
            <span className="intro__Word">ENIGMA WORLDS</span>! Embody
            extraordinary characters and become the{" "}
            <span className="intro__Word">PROTAGONIST</span>, live{" "}
            <span className="intro__Word">EPIC</span> adventures and take part
            in
            <span className="intro__Word"> EXTRAORDINARY QUESTS</span>. Ready to
            live <span className="intro__Word">UNFORGETTABLE EXPERIENCES</span>?
          </p>
        </div>
      </div>
      <div className="intro__Img">
        <img src={DiceIntro} alt="dé 20 façes" className="intro__DiceIntro1" />
        <img src={DiceIntro} alt="dé 20 façes" className="intro__DiceIntro2" />
      </div>
    </div>
  )
}

export default IntroHome
