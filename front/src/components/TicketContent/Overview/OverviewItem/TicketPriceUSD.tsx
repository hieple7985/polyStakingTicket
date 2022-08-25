import React, { memo, useEffect, useState } from 'react'
import { useMutation } from '@apollo/client';
import { EXCHANGE_CURRENCY } from '../../../../api/mutations/exchangeCurrency';

interface Props {
  price: number,
}

const TicketPriceUSD: React.FC<Props> = (props: Props): React.ReactElement => {
  const [realMoneyPrice, setRealMoneyPrice] = useState<number>(0);
  const [exchangeCurrency, {loading, error}] = useMutation(EXCHANGE_CURRENCY)
  
  useEffect(() => {
    exchangeCurrency({
      variables: {
        currency: props.price,
      },
      onCompleted: (data) => {
        setRealMoneyPrice(data.exchangeCurrency.currency);
      }
    })
  }, [])

  if (loading) return <p>...</p>
  return (
    <>
      {error 
      ?
        <></>
      :
        <div className='text-lg font-normal text-gray-500 mt-2'>
          <p>({Number.isInteger(realMoneyPrice) ? realMoneyPrice : realMoneyPrice.toFixed(4)} $)</p>
        </div>
      }
    </>
  )
}

export default memo(TicketPriceUSD)