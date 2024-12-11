import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { AppHeader } from '../AppHeader/AppHeader'
import { Sorter } from '../Sorter/Sorter'
import { TicketsList } from '../TicketsList/TicketsList'
import { fetchTickets } from '../../Store/rootSlice'
import classes from './App.module.scss'
import { Aside } from '../Aside/Aside'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
      dispatch(fetchTickets())
  }, [dispatch])

  return (
    <>
      <AppHeader />
      <main className={classes['app_main']}>
        <Aside />
        <div className={classes['container']}>
          <Sorter />
          <TicketsList />
        </div>
      </main>
    </>
  )
}

export default App