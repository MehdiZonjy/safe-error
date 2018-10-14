# Safe Error
This module is inspired by how golang handles errors, and allows you catch errors in a similar manner

## Example
```javascript
  const  {safe} = require('safe-error')
  const safeJsonParse = (str) => safe( () => JSON.parse(str))

  const {result, error} = safeJsonParse('{"msg": "Hello World}')
  if(error) {
    console.log('Invalid Json')  
  }
  else {
    console.log(result)
  }

```
It can also handle promise functions

```javascript
  const axios = require('axios')
  const {safeAsync} = require('safe-error')
  const safeGET = (url) => safeAsync( () => axios.get(url))

  const main = async () => {
    const {result, error} = await safeGET('http://invalidurl')
      if(error) {
        console.log('Failed to call endpoint', error)  
      }
      else {
        console.log(result.data)
      }
  }
  main()

```


## API
`type Result<T> = {error: Error|null, result: T|null}`

`safe<T>( () => T) => Result`

`safeAsync<T>( () => Promise<T>) => Promise<Result>`