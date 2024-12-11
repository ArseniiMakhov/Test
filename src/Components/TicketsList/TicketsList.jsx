import { List, Spin, Alert } from 'antd'
import { differenceInMinutes, parse } from 'date-fns'
import { useSelector } from 'react-redux'
import classes from './TicketsList.module.scss'
import { Ticket } from '../Ticket/Ticket'

export const TicketsList = () => {
  const rootReducer = useSelector((state) => state.rootReducer)
  const tickets = rootReducer.tickets
  const filters = rootReducer.filters
  const sorters = rootReducer.sorters
  const loading = rootReducer.loading

  const filterTickets = (tickets, filters) => {
    const spreadTickets = [].concat(...tickets)
    return spreadTickets.filter((ticket) => {
      return filters.some(
        (filter) =>
          (filter.checked && filter.stops === ticket.stops)
      )
    })
  }
  function getFlightDuration(ticket) {
    const fullDepartureDateTime = parse(`${ticket.departure_date} ${ticket.departure_time}`, 'dd.MM.yy HH:mm', new Date());
    const fullArrivalDateTime = parse(`${ticket.arrival_date} ${ticket.arrival_time}`, 'dd.MM.yy HH:mm', new Date());
    
    return differenceInMinutes(fullArrivalDateTime, fullDepartureDateTime);
}

  const sortTickets = (tickets, sorters) => {
    const sorter = sorters.find((obj) => obj.checked === true)
    switch (sorter.value) {
      case 'cheapest':
        return tickets.sort((a, b) => a.price - b.price)

      case 'fastest':
        return tickets.sort(
          (a, b) => getFlightDuration(a) - getFlightDuration(b)
        )
    }
  }

  const ticketsLoading = (load) => {
    if (load) {
      return (
        <div className={classes['tickets-loader']}>
          <Spin />
        </div>
      )
    }
  }

  const ticketsToShow = tickets ? sortTickets(filterTickets(tickets, filters), sorters) : []

  const ticketsList = (tickets) => {
    if (!tickets.length) {
      return (
        <Alert className={classes['alert']} message="Рейсов, подходящих под заданные фильтры, не найдено" type="info" />
      )
    } else {
      return (
        <List
          bordered={false}
          dataSource={ticketsToShow}
          renderItem={(item) => (
            <List.Item className={classes['list-item']}>
              <Ticket item={item} />
            </List.Item>
          )}
        />
      )
    }
  }

  return (
    <>
      {ticketsLoading(loading)}
      {ticketsList(ticketsToShow)}
    </>
  )
}