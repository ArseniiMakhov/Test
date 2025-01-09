import classes from './AppHeader.module.scss'
export const AppHeader = () => {
  return (
    <header className={classes['app-header']}>
      <img src="/plane.png" alt="logo" />
    </header>
  )
}