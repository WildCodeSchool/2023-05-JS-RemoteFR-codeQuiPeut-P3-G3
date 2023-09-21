import "./CharacterSettings.scss"
import { useState, useEffect } from "react"
import PopupImgFinder from "../../../../../../global/popups/ImageFinderPopup/PopupImgFinder.jsx"
import defaultImg from "../../../../../../../assets/images/user2.png"
import imgLife from "../../../../../../../assets/images/heart.png"
import imgSword from "../../../../../../../assets/images/sword.png"
import imgMoney from "../../../../../../../assets/images/money.png"
import imgSkills from "../../../../../../../assets/images/skills.png"
import ButtonUI from "../../../../../../global/Buttons/ButtonUI"
import { useEditionContext } from "../../../../../../../services/contexts/editionContext"
import { useLocation } from "react-router-dom"

import axios from "axios"

function CharacterSettings() {
  const [displayPopupImg, setDisplayPopupImg] = useState(false)
  const [selectedPathCharacter, setSelectedPathCharacter] = useState(null)
  const [hero, setHero] = useState([])
  const { editSettings, editStatus } = useEditionContext()

  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const story = params.get("story")
  const scene = params.get("scene")

  const [heroTemplate, setHeroTemplate] = useState({
    class: "",
    img: "",
    name: "",
    heal: 4,
    maxHeal: 4,
    money: 100,
    unit: "",
    equipped: {
      weapons: [],
    },
    inventory: {
      weapons: [],
      items: [],
    },
    skills: {
      agility: 0,
      strength: 0,
      intelligence: 0,
      resistance: 0,
    },
  })

  // const checkAllElements = (obj) => {
  //   const allValuesDefined = Object.values(obj).every((value) => {
  //     return value !== "" && value !== undefined
  //   })

  //   return allValuesDefined
  // }

  useEffect(() => {
    if (selectedPathCharacter !== "") {
      setHeroTemplate((prev) => ({
        ...prev,
        img: selectedPathCharacter,
      }))
    }
  }, [selectedPathCharacter])

  useEffect(() => {
    if (story && scene) {
      editSettings(story, scene)
    }
  }, [scene, story])

  useEffect(() => {
    if (editStatus.storyId) {
      apiGetHeroes(editStatus.storyId)
    }
  }, [editStatus.storyId])

  useEffect(() => {
    // console.log(heroTemplate.skills)
  }, [heroTemplate.skills])

  const apiGetHeroes = (storyId) => {
    axios
      .get(`http://localhost:4242/api-heroes/${storyId}`)
      .then((res) => {
        setHero(res.data)
      })
      .catch((error) => console.warn(error))
  }

  const apiSetHeroes = () => {
    const data = heroTemplate
    // console.log(heroTemplate)
    axios
      .put(`http://localhost:4242/api-heroes/${editStatus.storyId}`, data)
      .then((results) => {
        setHero((prev) => {
          const newHeroArray = [...prev]
          newHeroArray.push(results.data.content)
          return newHeroArray
        })
      })
      .catch((error) => {
        console.error("API Set Heroes Error:", error)
      })
  }

  const apiDeleteHero = (idHero) => {
    axios
      .delete(
        `http://localhost:4242/api-heroes/${editStatus.storyId}/${idHero}`
      )
      .then((res) => {
        if (res.status === 200) {
          alert("Hero deleted successfully")
          setHero(res.data)
        }
      })
  }

  return (
    <>
      <h5 className="ListCharacTitle"> List of characters </h5>
      <div className="listCharac">
        {hero &&
          hero.map((elem, index) => {
            return (
              elem.name !== "" && (
                <div className="charac" key={index}>
                  <p>
                    <b>Name:</b> {elem.name}
                  </p>
                  <p>
                    <b>Class :</b> {elem.class}
                  </p>
                  <p>
                    <b>Life :</b> {elem.heal}
                  </p>
                  <p>
                    <b>Money :</b> {elem.money}
                  </p>
                  <p>
                    <b>Agility :</b> {elem.skills.agility}
                  </p>
                  <p>
                    <b>Strength :</b> {elem.skills.strength}
                  </p>
                  <p>
                    <b>Intelligence :</b> {elem.skills.intelligence}
                  </p>
                  <p>
                    <b>Resistance :</b> {elem.skills.resistance}
                  </p>

                  <ButtonUI
                    title="delete"
                    bgcolor="#902b00"
                    onClick={() => apiDeleteHero(index)}
                  />
                </div>
              )
            )
          })}
      </div>
      <div className="wrapCharacter">
        <h4> Create a new hero </h4>
        <div className="wrapCharacter__cards">
          <section className="characterInfo">
            <div className="select__picture">
              <button
                className="selectPic"
                onClick={() => setDisplayPopupImg(true)}
              >
                <img
                  src={
                    selectedPathCharacter !== null
                      ? "http://localhost:4242/uploads/" + selectedPathCharacter
                      : defaultImg
                  }
                  alt="imgCharacter"
                />
              </button>
              {displayPopupImg && (
                <PopupImgFinder
                  setViewImgFinder={setDisplayPopupImg}
                  setSelectedPath={setSelectedPathCharacter}
                  selectedPath={selectedPathCharacter}
                />
              )}
            </div>
            <div className="selectBloc">
              <div className="blocText">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Michel"
                  value={heroTemplate.name}
                  onChange={(e) => {
                    setHeroTemplate((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }}
                />
              </div>
              <div className="blocText">
                <label htmlFor="Class">Class</label>
                <input
                  type="text"
                  id="class"
                  name="class"
                  placeholder="Barbarian"
                  value={heroTemplate.class}
                  onChange={(e) => {
                    setHeroTemplate((prev) => ({
                      ...prev,
                      class: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>
            <div className="selectBloc"></div>
          </section>
          <section className="characterLife">
            <div className="titleSection">
              <img src={imgLife} alt="imgLife" />
            </div>

            <div className="selectBloc">
              <div className="blocText">
                <label htmlFor="Life">Number of lives</label>
                <input
                  type="text"
                  id="Life"
                  name="Life"
                  placeholder="8"
                  value={heroTemplate.heal}
                  onChange={(e) => {
                    setHeroTemplate((prev) => ({
                      ...prev,
                      heal: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>
          </section>

          <section className="characterMoney">
            <div className="titleSection">
              <img src={imgMoney} alt="imgMoney" />
            </div>

            <div className="selectBloc">
              <div className="blocText">
                <label htmlFor="Money">Default money</label>
                <input
                  type="text"
                  id="Money"
                  name="Money"
                  placeholder="200"
                  value={heroTemplate.money}
                  onChange={(e) => {
                    setHeroTemplate((prev) => ({
                      ...prev,
                      money: e.target.value,
                    }))
                  }}
                />
              </div>
              <div className="blocText">
                <label htmlFor="Unit">Unit</label>
                <input
                  type="text"
                  id="Unit"
                  name="Unit"
                  placeholder="dollar"
                  value={heroTemplate.unit}
                  onChange={(e) => {
                    setHeroTemplate((prev) => ({
                      ...prev,
                      unit: e.target.value,
                    }))
                  }}
                />
              </div>
            </div>
          </section>

          <section className="characterWeapons">
            <div className="titleSection">
              <img src={imgSword} alt="imgMoney" />
            </div>
            <div className="blocText">
              <label htmlFor="Unit">Unit</label>
              <input type="text" id="Unit" name="Unit" placeholder="dollar" />
            </div>
          </section>

          <section className="characterSkills">
            <div className="titleSection">
              <img src={imgSkills} alt="imgMoney" />
            </div>
            <div className="skills">
              <div className="selectBloc">
                <div className="blocText">
                  <label htmlFor="Agility">Agility</label>
                  <input
                    type="text"
                    id="Agility"
                    name="Agility"
                    placeholder="20"
                    value={heroTemplate.skills.agility}
                    onChange={(e) => {
                      setHeroTemplate((prev) => ({
                        ...prev,
                        skills: {
                          ...prev.skills,
                          agility: e.target.value,
                        },
                      }))
                    }}
                  />
                </div>
                <div className="blocText">
                  <label htmlFor="strength">Strength</label>
                  <input
                    type="text"
                    id="strength"
                    name="strength"
                    placeholder="20"
                    value={heroTemplate.skills.strength}
                    onChange={(e) => {
                      setHeroTemplate((prev) => ({
                        ...prev,
                        skills: {
                          ...prev.skills,
                          strength: e.target.value,
                        },
                      }))
                    }}
                  />
                </div>
              </div>
              <div className="selectBloc">
                <div className="blocText">
                  <label htmlFor="intelligence">Intelligence</label>
                  <input
                    type="text"
                    id="intelligence"
                    name="intelligence"
                    placeholder="20"
                    value={heroTemplate.skills.intelligence}
                    onChange={(e) => {
                      setHeroTemplate((prev) => ({
                        ...prev,
                        skills: {
                          ...prev.skills,
                          intelligence: e.target.value,
                        },
                      }))
                    }}
                  />
                </div>

                <div className="blocText">
                  <label htmlFor="resistance">Resistance</label>
                  <input
                    type="text"
                    id="resistance"
                    name="resistance"
                    placeholder="20"
                    value={heroTemplate.skills.resistance}
                    onChange={(e) => {
                      setHeroTemplate((prev) => ({
                        ...prev,
                        skills: {
                          ...prev.skills,
                          resistance: e.target.value,
                        },
                      }))
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="wrapCharacter__buttons">
          <ButtonUI
            title="add"
            bgcolor="#3f7841"
            onClick={() => apiSetHeroes()}
          />
          <ButtonUI title="cancel" bgcolor="#902b00" />
        </div>
      </div>
    </>
  )
}

export default CharacterSettings
