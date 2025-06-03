const electricalKeywords:string[] = [
    "electrical",
    "electric",
    "wiring",
    "voltage",
    "power",
    "switch",
    "circuit",
    "current",
    "plug",
    "socket",
    "fuse",
    "energy",
    "cover Plates",
    "resistor",
    "capacitor",
    "transformer",
    "cover",
    "plates",
    "plates",
    "breakers",
  ];

 export const extractKeyword = (desc: string) => {
    // Naive keyword extractor: grabs first 1–2 significant words
    const commonWords = [
      "the",
      "and",
      "with",
      "a",
      "an",
      "in",
      "on",
      "at",
      "is",
      "of",
    ];
    const words = desc
      .split(" ")
      .map((w) => w.toLowerCase().replace(/[^\w\s]/gi, ""))
      .filter((w) => w && !commonWords.includes(w));

    return words.length > 0 ? words[0] : "electrical";
  };

  export const isElectricalImage = (img: any) => {
    const desc = img.alt_description?.toLowerCase() || "";
    const tags = img.tags?.map((t: any) => t.title.toLowerCase()) || [];
    return electricalKeywords.some(
      (keyword) => desc.includes(keyword) || tags.includes(keyword)
    );
  };

  export const fetchImage = async (query: string) => {
    try {
        console.log("key: ",window.env.UNSPLASH_KEY )
      const url = `https://api.unsplash.com/search/photos?page=1&query=${encodeURIComponent(
        query
      )}&client_id=${window.env.UNSPLASH_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error("Image fetch error:", error);
      return [];
    }
  };

  export const findMatchingElectricalWord = (desc: string) => {
    const words = desc.toLowerCase().split(/\W+/);
    return words.find((word) => electricalKeywords.includes(word));
  };