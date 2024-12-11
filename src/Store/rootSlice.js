import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchTickets = createAsyncThunk('apiReducer/fetchTickets', async function () {
  const response = await fetch('src/Store/tickets.json')
  if (!response.ok) {
    throw new Error('tickets loading error')
  }
  const data = await response.json()
  const tickets = data.tickets
  return tickets
})

const rootSlice = createSlice({
  name: 'rootReducer',
  initialState: {
    loading: null,
    tickets: null,
    allChecked: true,
    filters: [
      {
        stops: 0,
        label: 'Без пересадок',
        checked: true,
      },
      {
        stops: 1,
        label: '1 пересадка',
        checked: true,
      },
      {
        stops: 2,
        label: '2 пересадки',
        checked: true,
      },
      {
        stops: 3,
        label: '3 пересадки',
        checked: true,
      },
    ],
    sorters: [
      {
        value: 'cheapest',
        label: 'Самый дешевый',
        checked: true,
      },
      {
        value: 'fastest',
        label: 'Самый быстрый',
        checked: false,
      },
    ],
    currencies: [
      {
        value: 'RUB',
        label: 'RUB',
        checked: true,
      },
      {
        value: 'USD',
        label: 'USD',
        checked: false,
      },
      {
        value: 'EUR',
        label: 'EUR',
        checked: false,}
    ],
  },
  reducers: {
    toggleFilter(state, action) {
      const stops = action.payload.stops
      const updatedFiltersToggle = state.filters.map((el) => {
        if (el.stops === stops) {
          return { ...el, checked: !el.checked }
        }
        return el
      })
      const allFiltersChecked = updatedFiltersToggle.every((el) => el.checked)
      return {
        ...state,
        allChecked: allFiltersChecked,
        filters: updatedFiltersToggle,
        ticketsCounter: 5,
      }
    },
    toggleAllFilters(state) {
      const allChecked = !state.allChecked
      const updatedFilters = state.filters.map((el) => {
        return { ...el, checked: allChecked }
      })
      return {
        ...state,
        allChecked,
        filters: updatedFilters,
        ticketsCounter: 5,
      }
    },
    onSorterChange(state, action) {
      const value = action.payload.value
      const updatedSortersToggle = state.sorters.map((el) => {
        if (el.value === value) {
          return { ...el, checked: true }
        }
        return { ...el, checked: false }
      })
      return {
        ...state,
        sorters: updatedSortersToggle,
      }
    },
    onCurrencyChange(state, action) {
      const value = action.payload.value
      const updatedCurrenciesToggle = state.currencies.map((el) => {
        if (el.value === value) {
          return { ...el, checked: true }
        }
        return { ...el, checked: false }
      })
      return {
        ...state,
        currencies: updatedCurrenciesToggle,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false
        state.tickets = action.payload
      })
      .addCase(fetchTickets.rejected, (state) => {
        state.loading = false
      })
  },
})

export const { toggleAllFilters, toggleFilter, onSorterChange, onCurrencyChange } = rootSlice.actions
export default rootSlice.reducer