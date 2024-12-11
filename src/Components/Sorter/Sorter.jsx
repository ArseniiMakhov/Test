import { Radio } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import classes from './Sorter.module.scss'
import { onSorterChange } from '../../Store/rootSlice'

export const Sorter = () => {
  const dispatch = useDispatch()
  const rootReducer = useSelector((state) => state.rootReducer)
  const sorters = rootReducer.sorters

  const sortersToShow = sorters.map((sorter) => {
    return (
      <Radio.Button
        key={sorter.value}
        value={sorter.value}
        checked={sorter.checked}
        onClick={() => dispatch(onSorterChange({ value: sorter.value }))}
        className={classes['sorter-item']}
      >
        {sorter.label}
      </Radio.Button>
    )
  })

  return (
    <Radio.Group buttonStyle="solid" defaultValue={'cheapest'}>
      {sortersToShow}
    </Radio.Group>
  )
}