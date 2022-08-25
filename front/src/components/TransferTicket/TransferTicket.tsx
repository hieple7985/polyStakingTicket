import React, {memo} from 'react'

interface Props {
  address: string,
  setAddress: React.Dispatch<React.SetStateAction<string>>
}

const TransferTicket: React.FC<Props> = ({address, setAddress}: Props): React.ReactElement => {
  return (
    <>
      <div className='text-center w-full font-semibold'>
        <p>Please enter wallet address of recipient correctly.</p>
        <p>Tickets sent to the wrong address cannot be recovered.</p>
      </div>
      <div>
        <div className='font-semibold mt-10'>
            <label htmlFor="transfer-ticket-address-input">Address</label>
          </div>
          <div className={`input mt-2 ${address && 'active'}`}>
            <input 
              type="input" id="transfer-ticket-address-input" 
              placeholder="Add recipient's wallet address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <p></p>
          </div>
      </div>
    </>
  )
}

export default memo(TransferTicket)