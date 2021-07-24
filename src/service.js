export const getResource = async (url) => {
    try{
        const res = await fetch(url);
        if(!res.ok) {
          console.error('Could not fetch.', res.status);
          return false;
        }
        console.log(res)
        return await res.json()
    }catch (error) {
      console.error('Could not fetch.',error.message)
      return false;
    }
  }