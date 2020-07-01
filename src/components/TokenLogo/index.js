import React, { useState } from 'react'
import styled from 'styled-components'
import { isAddress } from '../../utils'

import { ReactComponent as DaiLogo } from '../../assets/images/Mark_Dai.svg'
import { ReactComponent as HoneyLogo } from '../../assets/images/Honey.svg'

const TOKEN_ICON_API = address =>
  `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
    address
  )}/logo.png`
const BAD_IMAGES = {}

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 1rem;
`

const Emoji = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

const StyledDaiLogo = styled(DaiLogo)`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

const StyledHoneyLogo = styled(HoneyLogo)`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`

export default function TokenLogo({ address, size = '1rem', ...rest }) {
  const [error, setError] = useState(false)

  let path = ''
  if (address === 'ETH') {
    return <StyledDaiLogo size={size} />
  } else if (address === '0x71850b7E9Ee3f13Ab46d67167341E4bDc905Eef9') {
    return <StyledHoneyLogo size={size} />
  } else if (!error && !BAD_IMAGES[address]) {
    path = TOKEN_ICON_API(address.toLowerCase())
  } else {
    return (
      <Emoji {...rest} size={size}>
        <span role="img" aria-label="Thinking">
          🤔
        </span>
      </Emoji>
    )
  }

  return (
    <Image
      {...rest}
      alt={address}
      src={path}
      size={size}
      onError={() => {
        BAD_IMAGES[address] = true
        setError(true)
      }}
    />
  )
}
