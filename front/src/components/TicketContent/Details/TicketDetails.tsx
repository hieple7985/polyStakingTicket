import React, { memo } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoTicket, IoQrCode } from 'react-icons/io5'
import { BsClockFill } from 'react-icons/bs'

import './TicketDetails.css'
import { TicketInterface } from '../../../api/queries/getTickets'
import { MdClass } from 'react-icons/md'

interface Props {
  ticket: TicketInterface;
}


const TicketDetails: React.FC<Props> = ({ ticket }: Props): React.ReactElement => {
  return (
    <>
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <IoQrCode />
          </i>
        </div>
        <div className='detail-info'>
          <div>
            <h6>Ticket ID</h6>
            <p>{ticket.id}</p>
          </div>
        </div>
      </article>
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <BsClockFill />
          </i>
        </div>
        <div className='detail-info'>
          <div>
            <h6>Ticket Status</h6>
            <p>{ticket.usable === 1 ? "Usable" : (ticket.usable === 2 ? "Used" : "N/A")}</p>
          </div>
        </div>
      </article>
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <IoTicket />
          </i>
        </div>
        <div className='detail-info'>
          <h6>Ticket Type </h6>
          <p>{ticket.ticketType === 1 ? "One time usage" : "Multi time usage"}</p>
        </div>
      </article>
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <MdClass />
          </i>
        </div>
        <div className='detail-info'>
          <h6>Ticket Class </h6>
          <p>{ticket.ticketClass}</p>
        </div>
      </article>
      
      <article className='detail-item'>
        <div className='detail-icon'>
          <i>
            <FaUser />
          </i>
        </div>
        <div className='detail-info'>
          <div>
            <h6>Ticket Provider</h6>
            <p>{ticket.event.owner.substring(0, 8) + '...' + ticket.event.owner.substring(ticket.event.owner.length - 8, ticket.event.owner.length)}</p>
          </div>
          <div className='mt-4'>
            <h6>Ticket Approver(s)</h6>
            {ticket.approvers.length > 0 
            ?
              ticket.approvers.map((approver, index) => (
                <div key={index}>
                  <p>{approver.substring(0, 8) + '...' + approver.substring(approver.length - 8, approver.length)}</p>
                </div>
              ))
            :
              <p>None</p>
            
            }
          </div>
        </div>
      </article>
    </>
  )
}

export default memo(TicketDetails)