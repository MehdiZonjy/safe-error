type Action<T> = () => T
type AsyncAction<T> = () => Promise<T>

export const safe = <T>(f: Action<T>) => {
  try {
    return { error: null, result: f() }
  } catch (error) {
    return { error, result: null }
  }
}

export const safeAsync = async <T>(f: AsyncAction<T>) => {
  try {
    return { error: null, result: await f() }
  } catch (error) {
    return { error, result: null }
  }
}
