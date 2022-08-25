import React from 'react'

interface Props {
  status: number,
}

const TicketSellingMark: React.FC<Props> = ({status}: Props): React.ReactElement => {
  return (
    <>
      {status === 1 &&
        <div className="overview_selling_mark">
          Selling
        </div>
      }
    </>
  )
}

export default TicketSellingMark