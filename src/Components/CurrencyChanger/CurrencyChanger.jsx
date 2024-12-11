import { Radio } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import classes from './CurrencyChanger.module.scss'
import { onCurrencyChange } from '../../Store/rootSlice'

export const CurrencyChanger = () => {
  const dispatch = useDispatch()
  const rootReducer = useSelector((state) => state.rootReducer)
  const currencies = rootReducer.currencies

  const sortersToShow = currencies.map((currency) => {
    return (
      <Radio.Button
        key={currency.value}
        value={currency.value}
        checked={currency.checked}
        onClick={() => dispatch(onCurrencyChange({ value: currency.value }))}
        className={classes['currency-item']}
      >
        {currency.label}
      </Radio.Button>
    )
  })

  return (
    <div className={classes['currency']}>
      <h4 className={classes['currency-title']}>Валюта</h4>
      <Radio.Group buttonStyle="solid" defaultValue={'RUB'}>
        {sortersToShow}
      </Radio.Group>
    </div>
  )
}