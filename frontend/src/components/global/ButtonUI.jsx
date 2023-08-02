import styled from "styled-components"

const WrapBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ButtonStyle = styled.button`
  height: ${(props) => props.height || "45px"};
  width: ${(props) => props.width || "65px"};
  max-width: ${(props) => props.maxWidth || "100%"};
  max-height: ${(props) => props.maxHeight || "100px"};
  background-color: ${(props) => props.backgroungColor || "#007bff"};
  color: ${(props) => props.colorText || "white"};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 0.5rem;
`

function ButtonUI({
  title,
  width,
  height,
  maxWidth,
  maxHeight,
  colorText,
  bgColor,
  onClick,
}) {
  return (
    <WrapBtn>
      <ButtonStyle
        width={width}
        height={height}
        maxWidth={maxWidth}
        maxHeight={maxHeight}
        colorText={colorText}
        backgroungColor={bgColor}
        onClick={onClick}
      >
        {title}
      </ButtonStyle>
    </WrapBtn>
  )
}

export default ButtonUI
