import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Form() {
  const [test, setTest] = useState([]);
  const [fontName, setFontName] = useState("Red Hat Text");
  const [fontURL, setFontURL] = useState();
  const [fontNameTwo, setFontNameTwo] = useState("Red Hat Text");
  const [fontURLTwo, setFontURLTwo] = useState();
  let tempVar, tempVarTwo;
  const SectionStyles = styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    max-width: 800px;
    flex-wrap: wrap;

    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    form > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }

    @font-face {
      font-family: ${fontName};
      src: url(${fontURL});
    }

    @font-face {
      font-family: ${fontNameTwo};
      src: url(${fontURLTwo});
    }

    p {
      font-family: ${fontName};
      padding: 10px;
      color: whitesmoke;
    }

    h1 {
      font-family: ${fontNameTwo};
      padding: 10px;
      color: whitesmoke;

    }

  

    .display-wrapper {
      display: flex;
      flex-direction: column;
      max-width: 50%;
      padding: 0 20px;
    }
    .header-wrap {
      display: 1;
    }
    .paragraph-wrap {
      display: 1;
    }


    .special_btn {
    position: relative;
      margin: 0.5rem 0;
    padding: 0.5rem;
    border: none;
    border-radius: 0.25rem;
    font-size: .85rem;
    font-weight: 100;
    background-color: transparent;
    cursor: pointer;
    color: #EFECEA;
    text-decoration: none;
  }
  .special_btn::before {
    content: "";
    position: absolute;
    bottom: 15%;
    left: 8.5%;
    width: 54%;
    height: 5%;
    background-color: #3B1E17;
    transition: .75s;
}
  .special_btn::after {
    content: "";
    position: absolute;
    top: 40%;
    left: 102%;
    border-radius: 50%;
    width: 7px;
    height: 7px;
    background-color: #94D4BE;
    transition: .75s;
}
.special_btn:hover::before {
    left: 67%;
    width: 26%;
    background-color: #94D4BE;
}
.special_btn:hover::after {
    top: 50%;
    left: 5%;
    border-radius: 0;
    width: 52%;
    height: 6%;
    background-color: #1D3B31;
}

    select {
      font-size: 12px;
      max-width: 125px;
      border-radius: 10px;
      margin: 10px;
      cursor: pointer;
      outline: none;
    }

   

    .option {
      background-color: #1D3B31;
      color: #EFECEA;
      cursor: pointer;
    }

    
@media (max-width: 768px) {
    .display-wrapper {
      margin-top: 30px;
      max-width: 100vw;
    }
   
  }



  `;

  const fetchData = async () => {
    const response = await fetch(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDKuNkb05g9k0iPDXCnnCDAu5mctac1edY`
    );
    const data = await response.json();
    const items = data.items;
    setTest(items);
  };

  useEffect(() => {
    fetchData();
    
  }, []);

  const handleChange = (index) => {
    const fontNames = index.target.selectedIndex;

    tempVar = fontNames;

    return tempVar;
  };

  const handleChangeTwo = (index) => {
    const fontNames = index.target.selectedIndex;

    tempVarTwo = fontNames;

    return tempVarTwo;
    
  };

  return (
    <SectionStyles>
      <form>
        <div>
          <label htmlFor="Header">Header</label>
          <select onChange={handleChangeTwo} name="" id="testSelect">
            <option className="option"  value="Choose">Choose a font</option>
            {test.map((el, index) => {
              const fontFamily = el.family;
              return (
                <option className="option"  key={index} value={fontFamily}>
                  {fontFamily}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="">Paragraph</label>
          <select onChange={handleChange} name="" id="testSelect">
            <option className="option"  value="Choose">Choose a font</option>
            {test.map((el, index) => {
              const fontFamily = el.family;
              return (
                <option className="option" key={index} value={fontFamily}>
                  {fontFamily}
                </option>
              );
            })}
          </select>
        </div>
        <button
          className="special_btn"
          onClick={(el) => {
            el.preventDefault();
            if (!tempVar || !tempVarTwo) {
              alert("Please select a font family for both elements.");
            } else {
              setFontURL(`https${(test[tempVar - 1].files.regular.slice(4))}`);
              setFontName(test[tempVar - 1].family);
              setFontURLTwo(`https${(test[tempVarTwo - 1].files.regular.slice(4))}`);
              setFontNameTwo(test[tempVarTwo - 1].family);
              console.log(test[tempVar - 1].family);
              console.log(test[tempVarTwo - 1].family);
            }
          }}
        >
          Preview Text
        </button>
      </form>
      <div className="display-wrapper">
        <div className="header-wrap">
          <h4>
            Font Being Displayed: <u>{fontNameTwo}</u>
          </h4>
          <h1>This is an H1</h1>
        </div>
        <div className="paragraph-wrap">
          <h4>
            Font Being Displayed: <u>{fontName}</u>
          </h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique
            eaque a quas porro voluptas quisquam neque ea consequuntur illo
            nihil? Animi necessitatibus magni sequi earum deserunt eos aliquid
            voluptate dolores?
          </p>
        </div>
      </div>
    </SectionStyles>
  );
}
