import React, {memo} from 'react'

interface Props {
  price: string,
  setPrice: React.Dispatch<React.SetStateAction<string>>
}

const SellTicketContent: React.FC<Props> = ({price, setPrice}: Props): React.ReactElement => {
  return (
    <>
      <div className='text-center w-full font-semibold'>
        <p>Please set a new price to sell your ticket.</p>
      </div>
      <div>
        <div className='font-semibold mt-10'>
          <label htmlFor="sell-ticket-price-input">Price</label>
          </div>
          <div className={`input mt-2 ${price && 'active'}`}>
            <input 
              type="number" id="sell-ticket-price-input" 
              placeholder="Set price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <p>MATIC</p>
          </div>
      </div>
    </>
  )
}

export default memo(SellTicketContent)