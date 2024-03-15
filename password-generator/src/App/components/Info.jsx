import React from 'react'
import styled, { css } from 'styled-components'

const InfoWrapper = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
`

const InfoText = styled.p`
  margin: 0;
  text-align: center;
  color: hsl(208.9, 11.9%, 50%);

  ${props => props.password && css`
    word-break: break-all;
  `}
`

const Info = ({ password, showResult }) => {
  return(
    <InfoWrapper>
      {!showResult && <InfoText>Please, open the basic and/or advanced settings and choose which options do you want to use. Then, click on the button below to generate your password.</InfoText>}

      {showResult && <InfoText password>{password}</InfoText>}
    </InfoWrapper>
  )
}

export default Info
