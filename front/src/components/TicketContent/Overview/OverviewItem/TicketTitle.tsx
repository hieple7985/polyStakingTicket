import React, { memo } from 'react'

interface Props {
  name: string
}

const TicketTitle: React.FC<Props> = (props: Props): React.ReactElement => {
  return (
    <>
      <h3>{props.name}</h3>
    </>
  )
}

export default memo(TicketTitle)