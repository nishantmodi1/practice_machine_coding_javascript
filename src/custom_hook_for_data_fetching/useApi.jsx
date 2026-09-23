const { useState } = require("react");

const useApi = () => {
  const [response, setResponse] = useState([])
  const [loading, setLoading] = useState(false);
  cons [error, setError] = useState(null);
  const [statusCode, setStatusCode]= useState('')
  const token = '9843irewkd9jrekmrm'

  const refetch = async({method, url, body}) => {
    const header = {
      Accept: 'application/json',
      'content-type': 'applicaion/json'
    }
    if(token){
      header['Authorization'] = `Bearer ${token}`
    }
    if(body instanceof FormData){
      header['content-type']= 'multipart/form-data'
    }
    setLoading(true);
    setError(null);
    setResponse([])
    setStatusCode(null)
    try {
      await axios(url, {method, headers:header, data: body})
      .then(res => {
        setResponse(res.data)
        setLoading(false);
        setStatusCode(res.status)
      })
      .catch(error => {
        console.error('axios error', error)
          setError(error)
          setLoading(false)
      })
    } catch (error) {
      console.error('error fetching data response', error)
    }
  } 

  return {refetch, response, loading, statusCode}
}
