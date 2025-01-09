import classes from './Ticket.module.scss'
import { useSelector } from 'react-redux'
import { parse, format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const Ticket = ({item}) => {
  const rootReducer = useSelector((state) => state.rootReducer)
  const { currencies } = rootReducer
  const formatPrice = (price, currencies) => {
    const currency = currencies.find((obj) => obj.checked === true)
    switch (currency.value) {
      case 'RUB':
        return `${price} ₽`

      case 'USD': 
        return `${Math.round(price / 70)} $`

      case 'EUR':
        return `${Math.round(price / 80)} €`
    }
  }


  const formatDate = (date) => {
    const parsedDate = parse(date, 'dd.MM.yy', new Date())
    return format(parsedDate, 'dd MMMM yyyy, EE', { locale: ru })
  }
  const stopsCheck = (stops) => {
    switch (stops) {
      case 0:
        return 'Прямой рейс'
      case 1:
        return '1 Пересадка'
      default:
        return `${stops} Пересадки`
    }
  }

  return (
    <div className={classes['ticket']}>
      <div  className={classes['ticket-left']}>
        <img className={classes['ticket-logo']} alt='ticket logo' src={'/public/airlines.png'}></img>
        <p  className={classes['ticket-price']}>Купить<br/> за {formatPrice(item.price, currencies)}</p>
      </div>
      <div className={classes['ticket-right']}>
        <div className={classes['ticket-from']}>
          <p className={classes['ticket-time']}>{item.departure_time}</p>
          <p className={classes['ticket-country']}>{item.origin}, {item.origin_name}</p>
          <p className={classes['ticket-date']}>{formatDate(item.departure_date)}</p>
        </div>
        <div className={classes['ticket-middle']}>
          <p className={classes['ticket-stops']}>{stopsCheck(item.stops)}</p>
          <img className={classes['ticket-arrow']} src='/public/arrow.png' alt='arrow'></img>
        </div>
        <div className={classes['ticket-to']}>
          <p className={classes['ticket-time']}>{item.arrival_time}</p>
          <p className={classes['ticket-country']}>{item.destination_name}, {item.destination}</p>
          <p className={classes['ticket-date']}>{formatDate(item.arrival_date)}</p>
        </div>
      </div>
    </div>
  )
}
