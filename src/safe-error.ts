type Action<T> = () => T

export const safe = <T>(f: Action<T>) => {
  try {
    return { error: null, result: f() }
  } catch (error) {
    return { error, result: null }
  }
}
