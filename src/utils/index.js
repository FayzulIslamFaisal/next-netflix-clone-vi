export const getTrendingMedias = async (mediaType) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/trending/${mediaType}/day?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`);

    if (!response.ok) throw new Error("Failed to fetch trending media");
    const data = await response.json();

    // Check if data.results is an array
    if (!Array.isArray(data.results)) {
      console.error("Unexpected trending media format:", data);
      return [];
    }
    return data.results;
  } catch (error) {
    console.error("Error fetching trending media:", error);
    return null; // fallback value or handle as needed
  }
};

export const getTopratedMedias = async (mediaType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${mediaType}/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );

    if (!response.ok) throw new Error("Failed to fetch trending media");
    const data = await response.json();

    // Check if data.results is an array
    if (!Array.isArray(data.results)) {
      console.error("Unexpected trending media format:", data);
      return [];
    }
    return data.results;
  } catch (error) {
    console.error("Error fetching trending media:", error);
    return null; // fallback value or handle as needed
  }
};

export const getPopularMedias = async (mediaType) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${mediaType}/popular?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );

    if (!response.ok) throw new Error("Failed to fetch trending media");
    const data = await response.json();
    // Check if data.results is an array
    if (!Array.isArray(data.results)) {
      console.error("Unexpected trending media format:", data);
      return [];
    }
    return data.results;
  } catch (error) {
    console.error("Error fetching trending media:", error);
    return null; // fallback value or handle as needed
  }
};


export const getTvOrMovieByGenre = async (mediaType, id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/discover/${mediaType}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&include_adult=false&sort_by=popularity.desc&with_genres=${id}` // 10759 is the genre id for TV Shows
    );

    if (!response.ok) {
      throw new Error("Failed to fetch media by genre");
       console.error(`Failed to fetch media by genre: ${response.status} - ${response.statusText}`);
       return null;
    }
    const data = await response.json();
    // Check if data.results is an array
    if (!Array.isArray(data.results)) {
      console.error("Unexpected trending media format:", data);
      return [];
    }
    return data.results;
  } catch (error) {
    console.error("Error fetching trending media:", error);
    return null;
  }
};


export const getTvOrMovieVideoById = async (mediaType, id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${mediaType}/${id}videos?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending media:", error);
    return null; // fallback value or handle as needed
  }
};

export const getTvOrMovieSearchs = async (mediaType, query) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/search/${mediaType}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&include_adult=false&language=en-US&query=${encodeURIComponent(query)}`
    );
    if (!response.ok) {
      throw new Error("API error");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching media:", error);
    return { results: [] }; // return safe fallback
  }
};



export const getTvOrMovieDetailsById = async (mediaType, id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${mediaType}/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US&append_to_response=videos`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending media:", error);
    return null; // fallback value or handle as needed
  }
};


export const getSimilerTvOrMovies = async (mediaType, id) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/${mediaType}/${id}similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`
    );
    const data = await response.json();
    return data?.results || [];
  } catch (error) {
    console.error("Error fetching trending media:", error);
    return null; 
  }
};

