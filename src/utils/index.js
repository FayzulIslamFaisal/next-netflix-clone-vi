export const getTrendingMedias = async (mediaType) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/trending/${mediaType}/day?api_key=${process.env.API_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch trending media");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending media:", error);
    return null; // fallback value or handle as needed
  }
};

export const getTopratedMedias = async (mediaType) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/${mediaType}/top_rated?api_key=${process.env.API_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch top-rated media");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending media:", error);
    return null; // fallback value or handle as needed
  }
};

export const getPopularMedias = async (mediaType) => {
  try {
    const response = await fetch(
      `${process.env.BASE_URL}/${mediaType}/popular?api_key=${process.env.API_KEY}&language=en-US`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch popular media");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching trending media:", error);
    return null; // fallback value or handle as needed
  }
};
