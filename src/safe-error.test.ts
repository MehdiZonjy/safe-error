import {safeAsync, safe} from './safe-error'

const failedAction = (error: Error) => () => {
  throw error
}

const successfulAction = (result: string) => () => result

const asyncAction = <T>(r: Promise<T>) => () => r

describe('error-handler', ()=>{
  describe('safe', ()=>{
    it('should wrap error inside r.error and assign r.result to null when action throws', ()=>{
      const err = new Error()
      const {result, error} = safe(failedAction(err))
      expect(error).toEqual(err)
      expect(result).toBeNull()
    })

    it('should assign value to r.result and set r.error to null when action succedes', ()=> {
      const msg = "Hello World"
      const {result, error} = safe(successfulAction(msg))
      expect(result).toEqual(msg)
      expect(error).toBeNull()
    })
  })

  describe('safeAsync', ()=>{
    it('should wrap error inside r.error and assign r.result to null when action throws', async ()=>{
      const err = new Error()
      const {result, error} = await safeAsync(asyncAction(Promise.reject(err)))
      expect(error).toEqual(err)
      expect(result).toBeNull()
    })

    it('should assign value to r.result and set r.error to null when action succedes', async ()=> {
      const msg = "Hello World"
      const {result, error} = await safeAsync(asyncAction(Promise.resolve(msg)))
      expect(result).toEqual(msg)
      expect(error).toBeNull()
    })  })
})