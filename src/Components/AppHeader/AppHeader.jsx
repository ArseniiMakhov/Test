import classes from './AppHeader.module.scss'
export const AppHeader = () => {
  return (
    <header className={classes['app-header']}>
      <img src="src/assets/plane.png" alt="logo" />
    </header>
  )
}