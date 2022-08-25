export interface TicketType {
  id: number,
  type: string,
}

const ticketTypes: TicketType[] = [
  {
    id: 1,
    type: "One time usage",
  },
  {
    id: 2,
    type: "Multi time usage",
  },
]

export default ticketTypes