import { Checkbox } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import classes from './Filter.module.scss'
import { toggleAllFilters, toggleFilter } from '../../Store/rootSlice'

export const Filter = () => {
  const dispatch = useDispatch()
  const rootReducer = useSelector((state) => state.rootReducer)
  const allChecked = rootReducer.allChecked
  const filters = rootReducer.filters

  const elements = filters.map((el, index) => {
    return (
      <Checkbox
        onChange={() => dispatch(toggleFilter({ stops: el.stops }))}
        key={index}
        checked={el.checked}
        className={classes['filter-checkbox']}
      >
        {el.label}
      </Checkbox>
    )
  })

  return (
    <div className={classes['filter']}>
      <h4 className={classes['filter-title']}>Количество пересадок</h4>
      <Checkbox
        onChange={() => dispatch(toggleAllFilters())}
        checked={allChecked}
        className={classes['filter-checkbox']}
      >
        Все
      </Checkbox>
      {elements}
    </div>
  )
}