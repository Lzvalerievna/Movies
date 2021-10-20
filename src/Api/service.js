

  export default class SwapiService {

    apiBase = 'https://api.themoviedb.org/3';

    apiKey = '7ffce4f49b66e12f59dd06c5256de3c2';

   
    async getResource(url) {
      try{
        const res = await fetch(url);
        if(!res.ok) {
          console.error('Could not fetch.', res.status);
          return false;
        } 
        return await res.json()
    }catch (error) {
      console.error('Could not fetch.',error.message)
      return false;
    }
    }

 

    getSearchMovies(text = "return",page = 1) {
      return this.getResource(`${this.apiBase}/search/movie?api_key=${this.apiKey}&query=${text}&page=${page}`)
    }

    getGenre() {
      return  this.getResource(`${this.apiBase}/genre/movie/list?api_key=${this.apiKey}`)
    }

    getSessionId() {
      return this.getResource(`${this.apiBase}/authentication/guest_session/new?api_key=${this.apiKey}`)
    }

    async getRated(guestSession,  page = 1) {
      const res =  await fetch(`${this.apiBase}/guest_session/${guestSession}/rated/movies?api_key=${this.apiKey}&language=en-US&sort_by=created_at.asc&page=${page}`)
      return res;
    }

    getNextPage(value,page) {
      return this.getResource(`${this.apiBase}/search/movie?api_key=${this.apiKey}&query=${value}&page=${page}`)
    }

    postRated(stars,id,guestSession) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: stars })
      }
        fetch(`${this.apiBase}/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${guestSession}`, requestOptions) 
        .then(response => response.json())
    }

    apiImg = 'http://image.tmdb.org/t/p/w1280';
    
    apiImg2 = 'https://www.culture.ru/storage/images/114ef5db4413d02df173301f52d0ed82/2dbfc90e4ad57203361eff4a6ea41e14.jpeg';

  }