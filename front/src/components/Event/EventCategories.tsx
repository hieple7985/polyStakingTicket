import React, { memo } from 'react'
import { EventCategoryInterface } from '../../api/queries/getEvents';


// import './OverviewItem.css'
import { toTitleCase } from '../../util/FormatStringToTitle';

interface Props {
  categories: EventCategoryInterface[],
  isFull?: boolean,
}

const EventCategories: React.FC<Props> = (props: Props): React.ReactElement => {
  return (
    <>
      <div className='flex'>
        {props.isFull
          ? <>
            {props.categories.map(category => (
              <div key={category.category.id} className='ticket-category mr-2 my-1'
              >
                {toTitleCase(category.category.name)}
              </div>
            ))}
          </>
          : <>
            <div className='ticket-category mr-1 my-1'>
              {props.categories[0].category.name}
            </div>
            {props.categories.length > 1 &&
              <div className='ticket-category mr-1 my-1'>
                +{props.categories.length - 1}
              </div>
            }
          </>
        }
      </div>
    </>
  )
}

export default memo(EventCategories)