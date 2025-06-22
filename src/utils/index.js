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
