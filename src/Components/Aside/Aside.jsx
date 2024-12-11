import { CurrencyChanger } from '../CurrencyChanger/CurrencyChanger'
import { Filter } from '../Filter/Filter'
import classes from './Aside.module.scss'

export const Aside = () => {
  return (
    <div className={classes['aside']}>
      <CurrencyChanger/>
      <Filter/>
    </div>
  )
}