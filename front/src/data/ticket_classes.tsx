export interface TicketClassInterface {
  id: number,
  class: string,
}

const ticketClasses: TicketClassInterface[] = [
  {
    id: 1,
    class: "General",
  },
  {
    id: 2,
    class: "Premium",
  },
  {
    id: 3,
    class: "VIP",
  }
]

export default ticketClasses